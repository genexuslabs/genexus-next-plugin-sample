# GX Services Sample Extension

## Setup

This guide will help you set up the **GX Services Sample Extension** project, which demonstrates how to create a plugin for GeneXus IDE.

### Setting Up Custom NuGet Sources

The project relies on custom NuGet sources to fetch required dependencies. There are two custom sources that need to be configured:

- **BL_NUGET_SOURCE**
- **SERVICES_NUGET_SOURCE**

#### Steps

1. **Identify the paths**: Obtain the real paths to the custom NuGet sources for `BL_NUGET_SOURCE` and `SERVICES_NUGET_SOURCE`. These should point to the directories or URLs where your NuGet packages are hosted.

2. **Create environment variables**: Set up environment variables for your system:

   - **BL_NUGET_SOURCE**: Set this environment variable to the path of the BL NuGet source.
   - **SERVICES_NUGET_SOURCE**: Set this environment variable to the path of the Services NuGet source.

   Ensure that these variables are correctly set up so the project can resolve its dependencies during the build process.

3. **Build the Project**: Once the environment variables are configured, you can run ```dotnet build``` for GXServicesSampleExtension.csproj. 

4. **Deploy the Project**: Once the build is success, you can copy the package .dll to the services deploy folder.

## Content

This section provides an overview of the extension content and how it is structured to support the plugin's functionality.

### SampleObject

This example demonstrates how to add new objects to GeneXus. One such object is the `SampleObject`.

The `SampleObject` is composed by several parts:
- **Variables Part**
- **Documentation Part**
- **Sample Struct Part**

The **Sample Struct Part** contains a basic structure that is a collection of `SamplePartItem` instances. Each `SamplePartItem` has the following properties:
- **Name**
- **Description**
- **KBObjectName** (Note: `KBObjectName` is used for demonstration purposes and does not imply a reference to an actual object)

To enable the use of `SampleObject` in the frontend, we need to provide controllers that expose functionalities such as object creation, part editing, and property retrieval.

In this case, we have two controllers:
- **SampleObjectController**: Helps to manage the general operations of the `SampleObject`.
- **SampleStructPartController**: Handles the editing of the `Sample Struct Part`. This controller extends a base class provided by the SDK called `StructPartController`, to support editing using the StructEditor.

Additionally, to support text-based editing, the `Package.cs` file includes the `MultiRegionSourcePart` (provided by the SDK) to the `SampleObject`. This part accumulates region providers, allowing unified editing of all parts declared as providers within a single part. Therefore, this controller implements the `ISourceRegionProvider` interface. Note that `SampleStructurePartListener` is used to modify the `SampleStructPart` structure according to the parsed text.


In `Package.cs`, both the `SampleObject` and `SampleStructPart`, along with their respective controllers, are declared.

### SampleSourceObject

The `SampleSourceObject` is composed of the following parts:
- **SampleSourcePart**: A part that stores plain text.
- **DocumentationPart**

To manage these components, we have defined two controllers:
- **SampleSourceObjectController**: Handles operations related to the `SampleSourceObject`, including its creation and management.
- **SampleSourcePartController**: Manages the `SampleSourcePart`, providing support for editing the source value.

In this case, we will not use the multi-region editor but will instead use a text editor without regions, so the modifications mentioned in the previous case of `SampleStructPart` are not applied.

