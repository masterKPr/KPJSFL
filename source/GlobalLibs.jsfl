/**
*@author:fangtao
*@date:2014-11-01
*@support:525398535@qq.com
*/

version = "1.2.0";
init();

init.help = "启动设置";
function init() {
	/*启动设置*/
	clear_output();
	fl.showIdleMessage(false); //是否启用警告
	trace("Import code success! version:" + version);

}

trace.help = "不定长打印";
function trace() {
	/*不定长打印*/
	var list = [];
	for (var i = 0; i < arguments.length; i++) {
		list.push(arguments[i]);
	}
	fl.trace(list.join(" "));
}

load_script.help = "加载代码脚本";
function load_script(path) {
	/*加载代码脚本*/
	uri = to_uri(path);
	fl.runScript(uri);
}

write_config.help = "写入配置表";
function write_config(path, str) {
	/*写入配置表*/
	var uri = to_uri(path)
	FLfile.write(uri, str)
}

load_config.help = "加载配置表";
function load_config(path) {
	/*加载配置表*/
	var re = "";
	uri = to_uri(path);
	var exists = FLfile.exists(uri);
	if (exists) {
		re = FLfile.read(uri);
	} else {
		alert(path + " is not exists");
		re = "";
	}
	return re;
}

save_new_doc.help = "创建并保存一个新的fla 如果close为true 则创建完成后关闭";
function save_new_doc(save_path, close) {
	/*创建并保存一个新的fla 如果close为true 则创建完成后关闭*/
	doc = fl.createDocument();
	fl.saveDocument(doc, to_uri(save_path));
	if (close) {
		doc.close();
	}
	return doc;
}

is_uri.help = "判断参数是否是uri";
function is_uri(path) {
	/*判断参数是否是uri*/
	return path.indexOf("file:///") != -1;
}

to_uri.help = "将参数转化为uri 安全模式 无需担心是否已经是uri";
function to_uri(path) {
	/*将参数转化为uri 安全模式 无需担心是否已经是uri*/
	if (is_uri(path)) {
		return path;
	} else {
		return FLfile.platformPathToURI(path);
	}
}

to_path.help = "将参数转化为path 安全模式无需是否担心是否是path";
function to_path(path) {
	/*将参数转化为path 安全模式 安全模式无需是否担心是否是path*/
	if (!is_uri(path)) {
		return path;
	} else {
		return FLfile.uriToPlatformPath(path);
	}
}

clear_output.help = "清除输出面板";
function clear_output() {
	/*清除输出面板*/
	fl.outputPanel.clear();
}

get_current_path.help = "获取脚本路径";
function get_current_path() {
	/*获取脚本路径*/
	return fl.scriptURI.substr(0, fl.scriptURI.lastIndexOf("/") + 1);
}

get_child_file.help = "通过extension获取当前路径下所有文件 extension like .fla ";
function get_child_file(extension) {
	/*通过extension获取当前路径下所有文件 extension like .fla */
	return FLfile.listFolder(get_current_path() + "*" + extension, "file");
}

get_child_dir.help = "获取当前路径下所有文件夹";
function get_child_dir() {
	/*获取当前路径下所有文件夹*/
	return FLfile.listFolder(get_current_path(), "directories");
}

lib_bitmap_compress.help = "项目库进行压缩";
function lib_bitmap_compress(doc, quality) {
	/*项目库进行压缩*/
	lib = doc.library;
	for (var i = 0; i < lib.items.length; i++) {
		var item = lib.items[i];
		if (item.itemType == "bitmap") {
			image_compress(item, quality);
		}
	}
}

image_compress.help = "单个图片压缩";
function image_compress(item, quality) {
	/*单个图片压缩*/
	if (item.compressionType != "photo") {
		item.compressionType = "photo";
	}
	item.quality = quality;
}

set_item_link.help = "设置库项目导出类名"
function set_item_link(item, link_name) {
	/*设置库项目导出类名*/
	item.linkageImportForRS = false;
	item.linkageExportForRS = false;
	item.linkageExportForAS = true;
	item.linkageExportInFirstFrame = true;
	item.linkageClassName = link_name;

}

set_lib_link_by_name.help = "通过名称从lib中寻找并导出类名";
function set_lib_link_by_name(lib, name, link_name) {
	/*通过名称从lib中寻找并导出类名*/
	lib.selectItem(name);
	lib.setItemProperty("linkageImportForRS", false);
	lib.setItemProperty("linkageExportForRS", false);
	lib.setItemProperty("linkageExportForAS", true);
	lib.setItemProperty("linkageExportInFirstFrame", true);
	lib.setItemProperty("linkageClassName", link_name);
}

get_item_by_name.help = "通过name访问库里的项";
function get_item_by_name(doc, name) {
	/*通过name访问库里的项*/
	var lib = doc.library;
	for each(var item in lib.items) {
		if (item.name == name) {
			return item;
		}
	}
}

openDoc.help = "打开文档"
function openDoc(path) {
	/*打开文档*/
	uri = to_uri(path);
	return fl.openDocument(uri);
}

publish_without_HTML.help = "将html发布去掉";
function publish_without_HTML(doc) {
	/*将html发布去掉*/
	var xml = XML(doc.exportPublishProfileString());
	xml.PublishFormatProperties[0].html[0] = 0;
	doc.importPublishProfileString(String(xml));
}

publish_rename_SWF.help = "修改SWF发布路径和名称";
function publish_rename_SWF(doc, swf_name) {
	/*修改SWF发布路径和名称*/
	var xml = XML(doc.exportPublishProfileString());
	xml.PublishFormatProperties[0].defaultNames[0] = 0;
	xml.PublishFormatProperties[0].flashDefaultName[0] = 0;
	xml.PublishFormatProperties[0].flashFileName[0] = swf_name;
	doc.importPublishProfileString(String(xml));
}

get_lib_name.help = "通过path规则获取到库里的元件名";
function get_lib_name(path) {
	/*通过path规则获取到库里的元件名*/
	var uri = to_uri(path);
	var split = uri.split("/");
	var file_name = split[split.length - 1];
	var change_name = split[split.length - 2] + "/" + split[split.length - 1];
	change_name = change_name.split("|").join("-").split("/").join("_");
	return change_name;
}

import_to_lib.help = "导入图片并改名,会进行查重";
function import_to_lib(doc, path)
{
	/*导入图片并改名,会进行查重*/
	var uri = to_uri(path);
	var exists = FLfile.exists(uri);
	if (!exists)
	{
		throw "IOError:" + path;
	}
	var split = uri.split("/");
	var file_name = split[split.length - 1];
	var change_name = get_lib_name(path);

	var already = get_item_by_name(doc, change_name);
	if (already)
	{
		return already;
	}
	else
	{
		doc.importFile(uri, true, false, false);
		var item = get_item_by_name(doc, file_name);
		item.name = change_name;
		return item;
	}
}

xml_has_attribute.help = "检查判断当前节点XML是否含有key属性";
function xml_has_attribute(xml,key)
{
	var xls = xml.attributes();
	for each(var item in xls)
	{
		if(item.name()==key)
		{
			return true;
		}
	}
	return false;
}
