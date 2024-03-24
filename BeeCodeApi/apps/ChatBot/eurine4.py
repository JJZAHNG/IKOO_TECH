import requests
import json


# configuration
api_key = 'DT8qIfS9sElm2e8UIQRlaZCC'
secret_key = '4SLNjtKVxitVQ04kTDe37rlujjR7gUPK'

def get_access_token():
    """
    使用 API Key，Secret Key 获取access_token，替换下列示例中的应用API Key、应用Secret Key
    """
        
    url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=DT8qIfS9sElm2e8UIQRlaZCC&client_secret=4SLNjtKVxitVQ04kTDe37rlujjR7gUPK"
    
    payload = json.dumps("")
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json().get("access_token")

token_result = get_access_token()



def main():
    url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=" + token_result
    
    payload = json.dumps({
        "messages": [
            {
                "role": "user",
                "content": "介绍一下杭州"
            }
        ]
    })
    headers = {
        'Content-Type': 'application/json'
    }
    
    response = requests.request("POST", url, headers=headers, data=payload)
    
    print(response.text)
    

if __name__ == '__main__':
    main()