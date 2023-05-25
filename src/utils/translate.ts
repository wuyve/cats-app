// This file is auto-generated, don't edit it
import alimt20181012, * as $alimt20181012 from "@alicloud/alimt20181012";
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import Util, * as $Util from "@alicloud/tea-util";
import * as $tea from "@alicloud/tea-typescript";

export const createClient = (accessKeyId: string, accessKeySecret: string): alimt20181012 => {
  let config = new $OpenApi.Config({
    // 必填，您的 AccessKey ID
    accessKeyId: 'LTAI5tS6UykMrcGoxW4nsZxz',
    // 必填，您的 AccessKey Secret
    accessKeySecret: 'y80608991W',
  });
  // 访问的域名
  config.endpoint = `mt.cn-hangzhou.aliyuncs.com`;
  return new alimt20181012(config);
};

export const main1 = (args: string[]): Promise<void> => {
  // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
  let client = Client.createClient("accessKeyId", "accessKeySecret");
  let createDocTranslateTaskRequest = new $alimt20181012.CreateDocTranslateTaskRequest({
    sourceLanguage: "en",
    targetLanguage: "zh",
    formatType: "text",
    sourceText: "你好",
    scene: "general",
  });
  try {
    // 复制代码运行请自行打印 API 的返回值
    await client.createDocTranslateTaskWithOptions(createDocTranslateTaskRequest, new $Util.RuntimeOptions({}));
  } catch (error) {
    // 如有需要，请打印 error
    Util.assertAsString(error.message);
  }
}

// export default class Clientppp {
//   static createClient(accessKeyId: string, accessKeySecret: string): alimt20181012 {
//     let config = new $OpenApi.Config({
//       // 必填，您的 AccessKey ID
//       accessKeyId: 'LTAI5tS6UykMrcGoxW4nsZxz',
//       // 必填，您的 AccessKey Secret
//       accessKeySecret: 'y80608991W',
//     });
//     // 访问的域名
//     config.endpoint = `mt.cn-hangzhou.aliyuncs.com`;
//     return new alimt20181012(config);
//   }

//   static async main(args: string[]): Promise<void> {
//     // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
//     let client = Client.createClient("accessKeyId", "accessKeySecret");
//     let createDocTranslateTaskRequest = new $alimt20181012.CreateDocTranslateTaskRequest({
//       sourceLanguage: "en",
//       targetLanguage: "zh",
//       formatType: "text",
//       sourceText: "你好",
//       scene: "general",
//     });
//     try {
//       // 复制代码运行请自行打印 API 的返回值
//       await client.createDocTranslateTaskWithOptions(createDocTranslateTaskRequest, new $Util.RuntimeOptions({}));
//     } catch (error) {
//       // 如有需要，请打印 error
//       Util.assertAsString(error.message);
//     }
//   }
// }

// Client.main(process.argv.slice(2));
