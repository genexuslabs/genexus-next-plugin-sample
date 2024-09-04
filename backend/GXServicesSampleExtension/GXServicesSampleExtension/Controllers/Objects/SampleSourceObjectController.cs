using GeneXus.Services.Architecture.Controllers;
using GXServicesSampleExtension.Objects;

namespace GXServicesSampleExtension.Controllers.Objects;

public class SampleSourceObjectController : KBObjectController
{
    public SampleSourceObjectController(SampleSourceObject @object)
        : base(@object)
    {
    }

    public new SampleSourceObject Object { get { return (SampleSourceObject)base.Object; } }
}