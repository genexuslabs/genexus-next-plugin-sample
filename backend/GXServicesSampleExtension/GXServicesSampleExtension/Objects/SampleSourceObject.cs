using System.Runtime.InteropServices;
using Artech.Architecture.Common;
using Artech.Architecture.Common.Descriptors;
using Artech.Architecture.Common.Objects;
using Artech.Genexus.Common.Parts;
using GXServicesSampleExtension.Parts;

namespace GXServicesSampleExtension.Objects;

[Guid("C0DC1820-559B-44EC-8135-B5DB7540F0CE")]
[KBObjectDescriptor(Consts.SAMPLE_CATEGORY, "SampleSourceObject", "SampleSourceObject", ModuleAssociation = ModuleAssociation.Standard, ModuleInterfaceType = ModuleInterfaceType.UserInterface)]
[KBObjectComposition(true, typeof(SampleSourcePart), typeof(DocumentationPart))]
public class SampleSourceObject : KBObject
{
    public SampleSourceObject(KBModel model)
        : base(model, typeof(SampleSourceObject).GUID)
    {
    }
}