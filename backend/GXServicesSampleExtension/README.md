# GX Services Sample Extension Setup Guide

This guide will help you set up the **GX Services Sample Extension** project, which demonstrates how to create a plugin for GeneXus IDE.

## Setting Up Custom NuGet Sources

The project relies on custom NuGet sources to fetch required dependencies. There are two custom sources that need to be configured:

- **BL_NUGET_SOURCE**
- **SERVICES_NUGET_SOURCE**

### Steps

1. **Identify the paths**: Obtain the real paths to the custom NuGet sources for `BL_NUGET_SOURCE` and `SERVICES_NUGET_SOURCE`. These should point to the directories or URLs where your NuGet packages are hosted.

2. **Create environment variables**: Set up environment variables for your system:

   - **BL_NUGET_SOURCE**: Set this environment variable to the path of the BL NuGet source.
   - **SERVICES_NUGET_SOURCE**: Set this environment variable to the path of the Services NuGet source.

   Ensure that these variables are correctly set up so the project can resolve its dependencies during build.

3. **Build the Project**: Once the environment variables are configured, you can run dotnet build for GXServicesSampleExtension.csproj. 

4. **Deploy the Project**: Once the build is success, you can copy the package .dll to the services deploy folder.