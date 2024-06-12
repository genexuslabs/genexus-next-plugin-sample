using Artech.Architecture.Common.Services;
using Artech.Common.Exceptions;
using GeneXus.Services.Architecture.Packages;
using GXServicesSampleExtension.Controllers.Api;
using GXServicesSampleExtension.Objects;
using GXServicesSampleExtension.Parts;

namespace GXServicesSampleExtension;

public class Package : AbstractPackageServices
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
        AddApiController<SampleApiController>();
    }
}