var wsUri = "ws://localhost:9009";
var websocket = undefined;
var websocket_connected = false;
var last_answer = null;
var unload = false;

function connect(){
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(ev) { // connection is open
        websocket_connected = true;
        $('#main_preloader').fadeOut().end().delay(400).fadeOut('slow');
        setTimeout(function(){
            $('#main_preloader').remove();
        }, 400);
        send_message({'handler': 'init', 'sess_id': getCookie('sess_id')});
    }

    websocket.onerror	= function(ev){
        console.error('WebSocket Error: ' + ev.data);
    };
    websocket.onclose 	= function(ev){
        websocket = undefined;
        websocket_connected = false;
        if (!unload){
            toastr.remove();
            toastr.warning('Ошибка соединения с сервером!\nПовторное подключение через 5 сек....', 'Ошибка!');
            setTimeout(function (){
                connect();
            }, 5000);
        }
    };
}

connect();

//Send message
function send_message(request){
    try {
        var json_encoded = JSON.stringify(request);
        websocket.send(json_encoded);
        websocket.onmessage = function (ev){
            try {
                var response = JSON.parse(ev.data);
            }catch (Exception){
                return true;
            }
            var code;
            var concter_response;
            var type = response.type;
            if (!empty(response.response)){
                concter_response = response.response;
            }else if (!empty(response.error)){
                concter_response = response.error;
            }

            switch(type){
                case 'answer':
                    last_answer = concter_response;
                    switch (concter_response.code)
                    {
                        case 103:
                        case 102:
                            toastr.error('Вы не инициализированы!', 'Ошибка!');
                            break;
                        case 101:
                        case 100:
                            toastr.error('Ошибка JavaScript! Перезагрузите страницу!', 'Ошибка!');
                            break;
                        case 703:
                            toastr.error('Ошибка соединения с сервером!', 'Ошибка!');
                            websocket.close();
                            break;
                        default:
                           // toastr.warning(message, code);


                    }
            }
        }
        delete(websocket.onmessage);
        return true;
    }catch(e){
        return false;
    }
}

window.onbeforeunload = function (){
    if (websocket !== undefined){
        unload = true;
        send_message({'handler': 'save'});
    }
}