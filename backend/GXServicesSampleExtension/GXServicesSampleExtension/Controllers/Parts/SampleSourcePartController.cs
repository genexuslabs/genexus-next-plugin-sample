using Artech.Genexus.Common.Parts;
using GeneXus.Services.Architecture.Controllers;
using GeneXus.Services.Architecture.Dto;
using GeneXus.Services.Language.Common.Controllers;
using GXServicesSampleExtension.Parts;

namespace GXServicesSampleExtension.Controllers.Parts;

public class SampleSourcePartController : BaseSourcePartController
{
    public SampleSourcePartController(KBObjectController owner, SampleSourcePart part)
        : base(owner, part)
    {
        Source = part.Source;
    }

    public new SampleSourcePart Part => (SampleSourcePart)base.Part;

    public override KBObjectPartData GetData()
    {
        return new KBObjectPartData(Type, Part.Source);
    }

    public override void ParseSource(bool updateModel)
    {
        if (updateModel)
        {
            Part.Source = Source;
            Part.Dirty = true;
        }            
    }
}