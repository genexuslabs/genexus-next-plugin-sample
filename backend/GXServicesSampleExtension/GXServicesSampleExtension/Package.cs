using System.Runtime.InteropServices;
using Artech.Architecture.BL.Framework.Packages;
using Artech.Architecture.Common.Packages;
using Artech.Architecture.Common.Services;
using Artech.Common.Exceptions;
using Artech.Genexus.Common.Services;

//using GeneXus.Services.Architecture.Packages;
using GXServicesSampleExtension.Controllers.Api;
using GXServicesSampleExtension.Objects;
using GXServicesSampleExtension.Parts;

namespace GXServicesSampleExtension;

[Guid("CD4B71F0-E246-4985-93E5-6CBED453E90B")]
public class Package : AbstractPackage, IGxPackageBL
{
    private const string NAME = "Sample Services Extension";

    public Package()
    {
    }

    public override string Name => NAME;

    public override void Initialize(IGxServiceProvider services)
    {
        base.Initialize(services);
        AddTypes();
        AddControllers();
    }

    private void AddTypes()
    {
        try
        {
            AddCategory(new Guid(Consts.SAMPLE_CATEGORY), "Sample");
            AddObjectType<SampleObject>();
            AddPart<SamplePart>();
        }
        catch(Exception ex)
        {
            ExceptionManager.LogException(ex);
        }
    }

    private void AddControllers()
    {
        //AddApiController<SampleApiController>();
        GeneXus.Services.Architecture.Services.CommonServices.Communication.AddService(typeof(SampleApiController), true);
    }
}