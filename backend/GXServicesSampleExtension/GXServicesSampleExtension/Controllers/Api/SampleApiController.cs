using System.Runtime.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace GXServicesSampleExtension.Controllers.Api;

[ApiController]
[Route("sample.core")]
public class SampleApiController : ControllerBase
{
    public SampleApiController()
    {
        
    }
    
    [HttpGet("get_data")]
    public string GetData([FromQuery(Name = "kb_guid")] string kbGuid)
    {
        var result = "Data5";
        return result;
    }
    
    [HttpPost("echo")]
    public ActionResult<EchoData> Echo([FromQuery(Name = "kb_guid")] string kbGuid, [FromQuery(Name = "model_guid")] string modelGuid, string value)
    {
        return Ok(new EchoData(Guid.NewGuid(), value));
    }
    
    [HttpPost("echo2")]
    public ActionResult<EchoData> Echo2(string value)
    {
        return Ok(new EchoData(Guid.NewGuid(), value));
    }
}

[DataContract]
public class EchoData 
{
    public EchoData()
    {
    }

    public EchoData(Guid id, string value)
    {
        Id = id;
        Value = value;
    }
    
    [DataMember(Name = "value")]
    public string Value { get; set; }
    
    [DataMember(Name = "id")]
    public Guid Id { get; set; }
}