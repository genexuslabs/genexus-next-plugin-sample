using System.Runtime.InteropServices;
using System.Text;
using Artech.Architecture.Common.Descriptors;
using Artech.Architecture.Common.Objects;
using Artech.Genexus.Common.Parts;

namespace GXServicesSampleExtension.Parts;

[Guid("D74BEEDF-76C7-4617-8EC3-EFBE0A9572BB")]
[KBObjectPartDescriptor("SampleSourcePart", HasInterface = true)]
public class SampleSourcePart : KBObjectPart, ISource
{
    public SampleSourcePart(KBObject kbObject) 
        : base(typeof(SampleSourcePart).GUID, kbObject)
    {
        Source = string.Empty;
    }

    public string Source { get; set; }

    protected override byte[] SerializeData()
    {
        return Encoding.UTF8.GetBytes(Source);
    }

    protected override void DeserializeData(byte[] data)
    {
        Source = Encoding.UTF8.GetString(data);
    }
}