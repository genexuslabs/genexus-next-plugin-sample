using Artech.Architecture.Common.Objects;
using Artech.Common.Properties;

namespace GXServicesSampleExtension.Parts.SampleObject;

public class SamplePartItem : PropertiesObject
{
    private KBObject? m_KBObject;

    public SamplePartItem(SamplePart part)
    {
        SamplePart = part;
    }

    public SamplePart SamplePart { get; }

    public string Name
    {
        get => this.GetPropertyValueString(SamplePartItemProperties.NAME);
        set => this.SetPropertyValueString(SamplePartItemProperties.NAME, value);
    }

    public string Description
    {
        get => this.GetPropertyValueString(SamplePartItemProperties.DESCRIPTION);
        set => this.SetPropertyValueString(SamplePartItemProperties.DESCRIPTION, value);
    }

    public string KBObjectName
    {
        get => this.GetPropertyValueString(SamplePartItemProperties.KB_OBJECT_NAME);
        set => this.SetPropertyValueString(SamplePartItemProperties.KB_OBJECT_NAME, value);
    }

    protected override void ExtendObjectPropertyDefinition(PropertiesDefinition propDefinition)
    {
        base.ExtendObjectPropertyDefinition(propDefinition);

        propDefinition.AddDefinition(SamplePartItemProperties.NAME, typeof(string), string.Empty, Array.Empty<Attribute>());
        propDefinition.AddDefinition(SamplePartItemProperties.DESCRIPTION, typeof(string), string.Empty, Array.Empty<Attribute>());
        propDefinition.AddDefinition(SamplePartItemProperties.KB_OBJECT_NAME, typeof(string), string.Empty, Array.Empty<Attribute>());
    }
}