package cn.fintecher.print.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.*;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 封装HttpClient发送HTTP请求的方法
 * Created by jwdstef on 2017/3/7.
 */
public class HttpClientUtil {

    private static Log logger = LogFactory.getLog(HttpClientUtil.class);

    /**
     * 发送HTTP_GET请求
     *
     * @param requestURL    请求地址(含参数)
     * @param decodeCharset 解码字符集,解析响应数据时用之,其为null时默认采用UTF-8解码
     * @return 远程主机响应正文
     * 该方法会自动关闭连接,释放资源
     */
    public static String sendGetRequest(String requestURL, String decodeCharset) {
        //响应长度
        long responseLength = 0;
        //响应内容
        String responseContent = null;
        CloseableHttpClient httpClient = PoolingHttpClient.getHttpClient();
        HttpGet httpGet = new HttpGet(requestURL);
        CloseableHttpResponse response = null;
        try {
            //执行GET请求
            response = httpClient.execute(httpGet);
            //获取响应实体
            HttpEntity entity = response.getEntity();
            if (null != entity) {
                responseContent = EntityUtils.toString(entity, decodeCharset == null ? "UTF-8" : decodeCharset);
                responseLength = responseContent.length();
                EntityUtils.consume(entity);
            }
            logger.debug("请求地址: " + httpGet.getURI());
            logger.debug("响应状态: " + response.getStatusLine());
            logger.debug("响应长度: " + responseLength);
            logger.debug("响应内容: " + responseContent);
        } catch (ClientProtocolException e) {
            logger.debug("该异常通常是协议错误导致,比如构造HttpGet对象时传入的协议不对(将'http'写成'htp')或者服务器端返回的内容不符合HTTP协议要求等,堆栈信息如下", e);
        } catch (ParseException e) {
            logger.debug(e.getMessage(), e);
        } catch (IOException e) {
            logger.debug("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
        } finally {
            if (response != null) {
                try {
                    response.close();
                } catch (IOException e) {
                    logger.debug("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
                }
            }
            try {
                httpClient.close();
            } catch (IOException e) {
                logger.debug("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
            }
        }
        return responseContent;
    }


    /**
     * 发送HTTP_POST请求
     *
     * @param isEncoder 用于指明请求数据是否需要UTF-8编码,true为需要
     *                  该方法为<code>sendPostRequest(String,String,boolean,String,String)</code>的简化方法
     *                  该方法在对请求数据的编码和响应数据的解码时,所采用的字符集均为UTF-8
     *                  当<code>isEncoder=true</code>时,其会自动对<code>sendData</code>中的[中文][|][ ]等特殊字符进行<code>URLEncoder.encode(string,"UTF-8")</code>
     */
    public static String sendPostRequest(String reqURL, String sendData, boolean isEncoder) {
        return sendPostRequest(reqURL, sendData, isEncoder, null, null);
    }


    /**
     * 发送HTTP_POST请求
     *
     * @param reqURL        请求地址
     * @param sendData      请求参数,若有多个参数则应拼接成param11=value11&22=value22&33=value33的形式后,传入该参数中
     * @param isEncoder     请求数据是否需要encodeCharset编码,true为需要
     * @param encodeCharset 编码字符集,编码请求数据时用之,其为null时默认采用UTF-8解码
     * @param decodeCharset 解码字符集,解析响应数据时用之,其为null时默认采用UTF-8解码
     * @return 远程主机响应正文
     * 该方法会自动关闭连接,释放资源
     * 当<code>isEncoder=true</code>时,其会自动对<code>sendData</code>中的[中文][|][ ]等特殊字符进行<code>URLEncoder.encode(string,encodeCharset)</code>
     */
    public static String sendPostRequest(String reqURL, String sendData, boolean isEncoder, String encodeCharset, String decodeCharset) {
        String responseContent = null;
        CloseableHttpClient httpClient = PoolingHttpClient.getHttpClient();
        HttpPost httpPost = new HttpPost(reqURL);
        httpPost.setHeader(HTTP.CONTENT_TYPE, "application/x-www-form-urlencoded");
        CloseableHttpResponse response = null;
        try {
            if (isEncoder) {
                List<NameValuePair> formParams = new ArrayList<>();
                for (String str : sendData.split("&")) {
                    formParams.add(new BasicNameValuePair(str.substring(0, str.indexOf("=")), str.substring(str.indexOf("=") + 1)));
                }
                httpPost.setEntity(new StringEntity(URLEncodedUtils.format(formParams, encodeCharset == null ? "UTF-8" : encodeCharset)));
            } else {
                httpPost.setEntity(new StringEntity(sendData));
            }

            response = httpClient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            if (null != entity) {
                responseContent = EntityUtils.toString(entity, decodeCharset == null ? "UTF-8" : decodeCharset);
                EntityUtils.consume(entity);
            }
        } catch (Exception e) {
            logger.debug("与[" + reqURL + "]通信过程中发生异常,堆栈信息如下", e);
        } finally {
            if (response != null) {
                try {
                    response.close();
                } catch (IOException e) {
                    logger.debug("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
                }
                try {
                    httpClient.close();
                } catch (IOException e) {
                    logger.debug("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
                }
            }
        }
        return responseContent;
    }


    /**
     * 发送HTTP_POST请求
     *
     * @param reqURL        请求地址
     * @param params        请求参数
     * @param encodeCharset 编码字符集,编码请求数据时用之,其为null时默认采用UTF-8解码
     * @param decodeCharset 解码字符集,解析响应数据时用之,其为null时默认采用UTF-8解码
     * @return 远程主机响应正文
     * 该方法会自动对<code>params</code>中的[中文][|][ ]等特殊字符进行<code>URLEncoder.encode(string,encodeCharset)</code>
     */
    public static String sendPostRequest(String reqURL, Map<String, String> params, String encodeCharset, String decodeCharset) {
        String responseContent = null;
        CloseableHttpClient httpClient = PoolingHttpClient.getHttpClient();

        HttpPost httpPost = new HttpPost(reqURL);
        List<NameValuePair> formParams = new ArrayList<>(); //创建参数队列
        for (Map.Entry<String, String> entry : params.entrySet()) {
            formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
        }
        CloseableHttpResponse response = null;
        try {
            httpPost.setEntity(new UrlEncodedFormEntity(formParams, encodeCharset == null ? "UTF-8" : encodeCharset));
            response = httpClient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            if (null != entity) {
                responseContent = EntityUtils.toString(entity, decodeCharset == null ? "UTF-8" : decodeCharset);
                EntityUtils.consume(entity);
            }
        } catch (Exception e) {
            logger.debug("与[" + reqURL + "]通信过程中发生异常,堆栈信息如下", e);
        } finally {
            if (response != null) {
                try {
                    response.close();
                } catch (IOException e) {
                    logger.debug("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
                }

            }
            try {
                httpClient.close();
            } catch (IOException e) {
                logger.debug("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
            }
        }
        return responseContent;
    }

    /**
     * 发送HTTP_POST请求,json格式数据
     *
     * @param url
     * @param body
     * @return
     * @throws Exception
     */
    public static String sendPostByJson(String url, String body) throws Exception {
        CloseableHttpClient httpclient = HttpClients.custom().build();
        HttpPost post = null;
        String resData = null;
        CloseableHttpResponse result = null;
        try {
            post = new HttpPost(url);
            HttpEntity entity2 = new StringEntity(body, Consts.UTF_8);
            post.setConfig(RequestConfig.custom().setConnectTimeout(30000).setSocketTimeout(30000).build());
            post.setHeader("Content-Type", "application/json");
            post.setEntity(entity2);
            result = httpclient.execute(post);
            if (HttpStatus.SC_OK == result.getStatusLine().getStatusCode()) {
                resData = EntityUtils.toString(result.getEntity());
            }
        } finally {
            if (result != null) {
                result.close();
            }
            if (post != null) {
                post.releaseConnection();
            }
            httpclient.close();
        }
        return resData;
    }


}
