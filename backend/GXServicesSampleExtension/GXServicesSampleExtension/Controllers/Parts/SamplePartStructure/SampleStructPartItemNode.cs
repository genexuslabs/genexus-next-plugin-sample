using GeneXus.Services.Architecture.Controllers;
using GeneXus.Services.Language.Common.Model;

namespace GXServicesSampleExtension.Controllers.Parts.SamplePartStructure;

public class SampleStructPartItemNode : StructItemNode
{
    public SampleStructPartItemNode(IPropertiesProvider properties, string idProperty) : base(properties, idProperty)
    {
    }
}