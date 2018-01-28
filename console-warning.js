/*
 * console-warning.js
 * version: 1.0.0
 * author: inwdragon 
 * license : MIT
 * inspired from Facebook feature
 */

(function(window){
    function warn(){
        var library = {};

        library.log = function(options){
            if (!options) {
                options = {
                    locale: "th",
                    siteName: window.location.hostname
                }
            }

            var voice = switchLanguage(options.locale, options.siteName);

            return broadcast(voice.language[0].title, voice.language[1].message);
        };

        return library;
    }

    if(typeof(window.consoleWarning) === 'undefined'){
        window.consoleWarning = warn();
    }
})(window);

/* show log */
function broadcast(title, message)
{
    setTimeout(
        console.log.bind(console, '%c'+ title, 'font-family: kanit; color: #990000; font-size: 40px;')
    );
    setTimeout(
        console.log.bind(console, '%c'+ message, 'font-family: kanit; font-size: 20px;')
    );
}

/* choose language */
function switchLanguage(language, name)
{
    var local;

	switch(language) {
		case "th":
			local = thLanguage(name);
			break;
		case "en":
			local = enLanguage(name);
			break;
		default:
			local = thLanguage(name);
	}

	return local;
}

/*
 * Language
 */

/* thai - thailand */
function thLanguage(name)
{
	var title = "คำเตือน!";
	var messages = "คุณสมบัตินี้ (ตรวจสอบองค์ประกอบ) เป็นความสามารถของเบราเซอร์ที่มีจุดมุ่งหมายให้ใช้สำหรับผู้พัฒนา หากผู้ใดบอกให้คุณคัดลอกแล้ววางข้อความบางอย่างที่นี่เพื่อเปิดใช้งานคุณสมบัติการทำงานของ "
	+ name + " คำบอกกล่าวเช่นนี้เป็นกลลวงและจะทำให้ผู้นั้นมีสิทธิ์สร้างความเสียหายแก่บัญชีของคุณได้";

	return JSON.parse('{ "language": ['
        +'{ "title": "'+ title +'" },'
        +'{ "message": "'+ messages +'"}] }');
}

/* en - united states */
function enLanguage(name)
{
    var title = "Stop!";
    var messages = "This (inspect) is a browser feature intended for developers. If someone told you to copy and paste something here to enable a "
        + name + " feature, It is a scam and will give them access to your account.";

    return JSON.parse('{ "language": ['
        +'{ "title": "'+ title +'" },'
        +'{ "message": "'+ messages +'"}] }');
}
