using Antlr4.Runtime.Misc;
using GeneXus.Services.Architecture.Controllers;
using GeneXus.Services.Language.Common.Helpers;
using GeneXus.Services.Language.Common.Model;
using GXServicesSampleExtension.Parts;
using GXServicesSampleExtension.Parts.SampleObject;

namespace GXServicesSampleExtension.Controllers.Parts.SamplePartStructure;

public class SampleStructPartStructureListener : StructureBaseListener
{
    private SampleStructPart m_Part;
    private bool m_UpdateModel;
    private readonly Dictionary<string, SamplePartItem> m_Items = new Dictionary<string, SamplePartItem>(StringComparer.InvariantCultureIgnoreCase);
    private AstNode m_RootNode;
    public AstNode RootNode => m_RootNode;

    public SampleStructPartStructureListener(SampleStructPart part, bool updateModel)
    {
        m_Part = part;
        m_UpdateModel = updateModel;
        m_RootNode = new StructureNode();
    }

    public override void EnterStructure([NotNull] StructureParser.StructureContext ctx)
    {
        m_Items.Clear();
        foreach (SamplePartItem item in m_Part.Items)
            m_Items[item.Name] = item;

        m_RootNode = new StructureNode() { Range = AntlrHelper.GetRange(ctx) };

        if (m_UpdateModel)
            m_Part.Items = new List<SamplePartItem>();
    }

    public override void EnterStructure_atom([NotNull] StructureParser.Structure_atomContext ctx)
    {
        string itemName = ctx.structure_item_header().ID().GetText();
        SamplePartItem? item;

        if (m_UpdateModel)
        {
            if (!m_Items.TryGetValue(itemName, out item))
            {
                item = new SamplePartItem(m_Part)
                {
                    Name = itemName,
                    Description = itemName
                };
                m_Items.Add(itemName, item);
            }
            m_Part.Items.Add(item);
        }
        else
            item = m_Items[itemName];

        SampleStructPartItemNode itemNode = new SampleStructPartItemNode(new PropertiesProvider(item), SamplePartItemProperties.NAME) { Range = AntlrHelper.GetRange(ctx) };
        m_RootNode.Children.Add(itemNode);
        itemNode.Shortcuts = ctx.structure_item_header().structure_item_shortcuts()?.GetText();
        ProcessProperties(itemNode, ctx.structure_item_header().properties());
    }

    private void ProcessProperties(StructItemNode node, StructureParser.PropertiesContext ctx)
    {
        if (ctx != null)
            node.PropertiesSetNode.Range = AntlrHelper.GetRange(ctx);

        var list = ctx?.property_list();
        var props = list?.property();

        if (props != null)
        {
            foreach (var prop in props)
            {
                PropertyNameNode nameNode = null;
                PropertyValueNode valueNode = null;

                var nameCtx = prop.property_name();
                if (nameCtx != null && nameCtx.ID() != null)
                {
                    nameNode = new PropertyNameNode() { Range = AntlrHelper.GetRange(nameCtx) };
                    nameNode.Id = nameCtx.ID()?.GetText();
                }

                var valueCtx = prop.property_value();
                if (valueCtx != null)
                {
                    valueNode = new PropertyValueNode() { Range = AntlrHelper.GetRange(valueCtx) };
                    valueNode.Value = valueCtx.GetText();
                }

                node.PropertiesSetNode.Children.Add(new PropertyNode(nameNode, valueNode) { Range = AntlrHelper.GetRange(prop) });
            }
        }

        if (m_UpdateModel)
            node.SetPropertiesFromSource();
    }
}