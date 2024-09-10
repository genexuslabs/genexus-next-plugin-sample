using System.Runtime.InteropServices;

using Artech.Architecture.BL.Framework.Packages;
using Artech.Architecture.Common.Descriptors;
using Artech.Architecture.Common.Objects;
using Artech.Architecture.Common.Packages;
using Artech.Architecture.Common.Services;
using Artech.Common.Exceptions;
using GeneXus.Services.Architecture.Services;
using GeneXus.Services.Language.Common.Parts;

using GXServicesSampleExtension.Controllers.Api;
using GXServicesSampleExtension.Controllers.Objects;
using GXServicesSampleExtension.Controllers.Parts;
using GXServicesSampleExtension.Objects;
using GXServicesSampleExtension.Parts;

using GxmServices = GeneXus.Services.Architecture.Services.CommonServices;

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

    public override void PostInitialize()
    {
        base.PostInitialize();
        UpdateDescriptors();
    }

    private void AddTypes()
    {
        try
        {
            AddCategory(new Guid(Consts.SAMPLE_CATEGORY), "Sample");
            AddObjectType<SampleObject>();
            AddObjectType<SampleSourceObject>();
            AddPart<SampleSourcePart>();
            AddPart<SampleStructPart>();
        }
        catch(Exception ex)
        {
            ExceptionManager.LogException(ex);
        }
    }

    private void UpdateDescriptors()
    {
        AddKBObjectPart<SampleObject>(typeof(MultiRegionSourcePart).GUID);
    }

    private void AddKBObjectPart<TKBObject>(Guid partType) where TKBObject : KBObject
    {
        var descriptor = KBObjectDescriptor.Get<TKBObject>();
        if (!descriptor.Parts.Contains(partType))
            descriptor.AddPart(partType);
    }

    private void AddControllers()
    {
        AddKBObjectControllers();
        AddKBObjectPartControllers();
        AddServiceControllers();
    }

    private void AddServiceControllers()
    {
        GxmServices.Communication.AddService(typeof(SampleApiController), true);
    }

    private void AddKBObjectControllers()
    {
        AddKBObjectController<SampleObject>((kbObject) => new SampleObjectController(kbObject));
        AddKBObjectController<SampleSourceObject>((kbObject) => new SampleSourceObjectController(kbObject));
    }

    private void AddKBObjectPartControllers()
    {
        AddKBObjectPartController<SampleSourcePart>((owner, part) => new SampleSourcePartController(owner, part));
        AddKBObjectPartController<SampleStructPart>((owner, part) => new SampleStructPartController(owner, part));        
    }

    private static void AddKBObjectController<TKBObject>(KBObjectControllerFactory<TKBObject> factory) where TKBObject : KBObject
    {
        GxmServices.ControllerManager.ReplaceKBObjectController<TKBObject>(factory);
    }

    private static void AddKBObjectPartController<TKBObjectPart>(KBObjectPartControllerFactory<TKBObjectPart> factory) where TKBObjectPart : KBObjectPart
    {
        GxmServices.ControllerManager.ReplaceKBObjectPartController(factory);
    }
}