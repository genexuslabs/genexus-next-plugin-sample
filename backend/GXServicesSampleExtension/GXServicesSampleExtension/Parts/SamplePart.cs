using System.Runtime.InteropServices;
using Artech.Architecture.Common.Descriptors;
using Artech.Architecture.Common.Objects;

namespace GXServicesSampleExtension.Parts;

[Guid("A8C2F988-F848-4AE4-AA4D-59E30D358CED")]
[KBObjectPartDescriptor("SamplePart", HasInterface = true)]
public class SamplePart: KBObjectPart
{
    public SamplePart(KBObject kbObject) 
        : base(typeof(SamplePart).GUID, kbObject)
    {
    }
}