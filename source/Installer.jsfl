var folder_name = "KPJSFL";
var code_list = ["GlobalLibs.jsfl", "CreateScript.jsfl"];
var current_dir = fl.scriptURI.substr(0, fl.scriptURI.lastIndexOf("/") + 1);
for each(var code_name in code_list) {
	var source = current_dir + code_name;
	if (!FLfile.exists(source)) {
		alert("无法找到" + source);
	}
	var folder_path = fl.configURI + folder_name + "/";
	FLfile.createFolder(folder_path);
	var target = folder_path + code_name;
	if (FLfile.exists(target)) {
		FLfile.remove(target);
	}
	FLfile.copy(source, target);
}
alert("安装完成!");