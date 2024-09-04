using Artech.Architecture.Common.Descriptors;
using Artech.Architecture.Common.Packages;
using GXServicesSampleExtension;
using GXServicesSampleExtension.Objects;
using GXServicesSampleExtension.Parts;

// General Information about an assembly is controlled through the following
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.
// [assembly: AssemblyTitle("GeneXus.Services.Packages.Core")]
// [assembly: AssemblyDescription("")]
// [assembly: AssemblyConfiguration("")]
//

// // The following GUID is for the ID of the typelib if this project is exposed to COM
// [assembly: Guid("50a5d30c-d46d-4367-a502-db370e6bd086")]

[assembly: PackageAttribute(typeof(Package), IsCore = true, IsUIPackage = false)]

[assembly: KBObjectsDeclaration(
    typeof(SampleObject)
)]

[assembly: KBObjectsDeclaration(
    typeof(SampleSourceObject)
)]

[assembly: KBObjectPartsDeclarationAttribute(
    typeof(SampleStructPart)
)]

[assembly: KBObjectPartsDeclarationAttribute(
    typeof(SampleSourcePart)
)]