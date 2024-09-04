using GeneXus.Services.Architecture.Controllers;
using GeneXus.Services.Language.Common.Model;

namespace GXServicesSampleExtension.Controllers.Parts.SamplePartStructure;

public class SamplePartItemNode : StructItemNode
{
    public SamplePartItemNode(IPropertiesProvider properties, string idProperty) : base(properties, idProperty)
    {
    }
}