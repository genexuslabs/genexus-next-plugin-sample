using System.Text;
using Antlr4.Runtime;
using Antlr4.Runtime.Tree;
using Artech.Architecture.Common.Objects;
using GeneXus.Services.Architecture.Controllers;
using GeneXus.Services.Architecture.Controllers.Structure;
using GeneXus.Services.Architecture.Dto;
using GeneXus.Services.Common.Collections;
using GeneXus.Services.Common.Helpers;
using GeneXus.Services.Language.Common.Helpers;
using GeneXus.Services.Language.Common.Model;
using GXServicesSampleExtension.Controllers.Parts.SamplePartStructure;
using GXServicesSampleExtension.Parts;
using GXServicesSampleExtension.Parts.SampleObject;

namespace GXServicesSampleExtension.Controllers.Parts;

public class SamplePartController : StructPartController<StructItemData>, ISourceRegionProvider
{
    private TwoWayMap<Guid, SamplePartItem> m_ItemMap;
    private Guid m_RootGuid = Guid.NewGuid();
    
    public SamplePartController(KBObjectController owner, SamplePart part)
        : base(owner, part)
    {
        m_ItemMap = new TwoWayMap<Guid, SamplePartItem>();
    }

    public new SamplePart Part => (SamplePart)base.Part;

    public override KBObjectPartData GetData()
    {
        string json = JsonHelper.SerializeObject(GetItemsData());
        return new KBObjectPartData(Type, json);
    }

    public override IPropertiesProvider GetProperties(string path)
    {
        if (Guid.TryParse(path, out Guid guid))
        {
            if (m_ItemMap.Forward.TryGetValue(guid, out SamplePartItem item))
                return new PropertiesProvider(item);
            if (Guid.Equals(guid, m_RootGuid))
                return new PropertiesProvider(Part.KBObject);
        }

        return base.GetProperties(path);
    }

    public override void Reload()
    {
        m_ItemMap.Clear();
    }

    #region StructPartController
    private StructItemData GetItemsData()
    {
        StructItemData root = new StructItemData() 
        { 
            Guid = m_RootGuid,
            Type = SamplePartItemTypes.SAMPLE_PART_ROOT 
        };      
        
        foreach(SamplePartItem partItem in Part.Items)
        {
            Guid itemGuid = Guid.NewGuid();
            m_ItemMap.Add(itemGuid, partItem);
 
            root.Items.Add(new StructItemData() 
            {
                Guid = itemGuid, 
                Type = SamplePartItemTypes.SAMPLE_PART_ITEM 
            });
        }

        return root;
    }

    public override string ReloadItem(Guid guid)
    {
        return string.Empty;
    }

    public override void InsertItem(StructItemData child, Guid parentGuid, int index)
    {
        if (!m_ItemMap.Forward.TryGetValue(child.Guid, out SamplePartItem item))
        {
            item = new SamplePartItem(Part);
            m_ItemMap.Add(child.Guid, item);
        }
        Part.Items.Insert(index, item);
    }

    public override void RemoveItemByGuid(Guid guid)
    {
        if (m_ItemMap.Forward.TryGetValue(guid, out SamplePartItem item))
            Part.Items.Remove(item);
        else
            throw new Exception("Item not found");
    }
    #endregion

    #region ISourceRegionProvider

    public IList<InlineChoice> GetInlineChoices(InlineChoiceContext context)
    {
        return new List<InlineChoice>();
    }

    public IntellisenseChoiceList GetIntellisenseChoices(IntellisenseContext context)
    {
        IntellisenseChoiceList choices = new IntellisenseChoiceList();

        foreach(KBObject obj in Part.Model.Objects)
        {
            IntellisenseChoice choice = new IntellisenseChoice
            {
                Documentation = obj.Description,
                InsertText = obj.QualifiedNameString,
                Label = obj.Name,
                Type = IntellisenseChoiceType.Object
            };

            choices.Choices.Add(choice);
        }

        return choices;
    }

    public IEnumerable<SourceRegion> GetSourceRegions(string indentString)
    {
        StructureNode root = new StructureNode();

        foreach(SamplePartItem item in Part.Items)
            root.Children.Add(new StructItemNode(new PropertiesProvider(item), SamplePartItemProperties.NAME));

        StringBuilder sb = new StringBuilder();
		root.ToSource(sb, true, indentString);

        yield return new SourceRegion(null, sb.ToString());
    }

    public ParseResult ParseSourceRegion(string name, string source, bool updateModel)
    {
        CaseInsensitiveInputStream stream = new CaseInsensitiveInputStream(source);
        ITokenSource lexer = new StructureLexer(stream);
        ITokenStream tokenStream = new CommonTokenStream(lexer);
        StructureParser parser = new StructureParser(tokenStream);
        parser.BuildParseTree = true;
        IParseTree tree = parser.structure();
        SamplePartStructureListener listener = new SamplePartStructureListener(Part, updateModel);
        ParseTreeWalker walker = new ParseTreeWalker();
        walker.Walk(listener, tree);

        Part.Dirty = true;

        return new ParseResult() { RootNode = listener.RootNode };
    }    
    #endregion
}

public class SamplePartItemTypes
{
    public const string SAMPLE_PART_ROOT = "SamplePartRoot";
    public const string SAMPLE_PART_ITEM = "SamplePartItem";
}