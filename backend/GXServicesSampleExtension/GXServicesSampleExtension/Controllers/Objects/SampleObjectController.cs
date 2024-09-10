using GeneXus.Services.Architecture.Controllers;
using GXServicesSampleExtension.Objects;

namespace GXServicesSampleExtension.Controllers.Objects;

public class SampleObjectController : KBObjectController
{
    public SampleObjectController(SampleObject @object)
        : base(@object)
    {
    }

    public new SampleObject Object { get { return (SampleObject)base.Object; } }
}