using System.Runtime.InteropServices;
using Artech.Architecture.Common;
using Artech.Architecture.Common.Descriptors;
using Artech.Architecture.Common.Objects;
using Artech.Genexus.Common.Parts;
using GXServicesSampleExtension.Parts;

namespace GXServicesSampleExtension.Objects;

[Guid("2757390B-863D-456E-A3DF-8C451420BC50")]
[KBObjectDescriptor(Consts.SAMPLE_CATEGORY, "SampleObject", "SampleObject", ModuleAssociation = ModuleAssociation.Standard, ModuleInterfaceType = ModuleInterfaceType.UserInterface)]
[KBObjectComposition(true, typeof(SampleStructPart), typeof(VariablesPart), typeof(DocumentationPart))]
public class SampleObject : KBObject
{
    public SampleObject(KBModel model)
        : base(model, typeof(SampleObject).GUID)
    {
    }
}