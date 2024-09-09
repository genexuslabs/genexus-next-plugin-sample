using System.Runtime.InteropServices;
using System.Text;
using System.Xml;
using System.Xml.Serialization;
using Artech.Architecture.Common.Descriptors;
using Artech.Architecture.Common.Objects;
using GXServicesSampleExtension.Parts.SampleObject;

namespace GXServicesSampleExtension.Parts;

[Guid("A8C2F988-F848-4AE4-AA4D-59E30D358CED")]
[KBObjectPartDescriptor("SampleStructPart", HasInterface = true)]
public class SampleStructPart: KBObjectPart
{
    public SampleStructPart(KBObject kbObject) 
        : base(typeof(SampleStructPart).GUID, kbObject)
    {
        Items = new List<SamplePartItem>();
    }

    public List<SamplePartItem> Items { get; set; }

    protected override byte[] SerializeData()
    {
        List<string> itemsXml = new List<string>();
        foreach(SamplePartItem item in Items)
            itemsXml.Add(item.SerializeToXml());
        
        XmlSerializer serializer = new XmlSerializer(itemsXml.GetType());
        StringBuilder sb = new StringBuilder();
        using(XmlWriter writer = XmlWriter.Create(sb))
        {
            serializer.Serialize(writer, itemsXml);
        }
        

        return Encoding.UTF8.GetBytes(sb.ToString());
    }

	protected override void DeserializeData(byte[] data)
    {
        List<string> itemsXml = new List<string>();
        string xml = Encoding.UTF8.GetString(data);
        XmlSerializer serializer = new XmlSerializer(itemsXml.GetType());
        using (TextReader reader = new StringReader(xml))
        {
            itemsXml = (serializer.Deserialize(reader) as List<string>) ?? new List<string>();
        }
        
        Items = new List<SamplePartItem>();
        foreach(string itemXml in itemsXml)
        {
            SamplePartItem item = new SamplePartItem(this);
            item.DeserializeFromXml(itemXml);
            Items.Add(item);
        }
    }
}