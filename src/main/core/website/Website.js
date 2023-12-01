import Nginx from "@/main/core/Nginx";
import NginxWebsite from "@/main/core/website/NginxWebsite";
import FileUtil from "@/main/utils/FileUtil";
import DirUtil from "@/main/utils/DirUtil";

export default class Website {
    /**
     *
     * @param websiteInfo {WebsiteItem}
     */
    static async add(websiteInfo) {
        if (await Nginx.websiteExists(websiteInfo.serverName, websiteInfo.port)) {
            throw new Error(`${websiteInfo.serverName}:${websiteInfo.port}\n已经存在，不能重复！`)
        }

        if (!await FileUtil.Exists(websiteInfo.rootPath)) {
            await DirUtil.Create(websiteInfo.rootPath)
        }
        await Nginx.addWebsite(websiteInfo);
    }

    static async delete(confName) {
        await Nginx.delWebsite(confName);
    }

    static async getList(search) {
        return await Nginx.getWebsiteList(search);
    }

    static async getBasicInfo(confName) {
        const website = new NginxWebsite(confName);
        await website.init()
        return website.getBasicInfo();
    }

    static async getRewrite(confName) {
        return await NginxWebsite.getRewrite(confName);
    }

    static getConfPath(confName) {
        return Nginx.getWebsiteConfPath(confName);
    }

    static getRewriteConfPath(confName) {
        return Nginx.getWebsiteRewriteConfPath(confName);
    }

    /**
     * 获取URL重写规则列表
     * @returns {Promise<string[]>}
     */
    static async getRewriteRuleList() {
        return await Nginx.getRewriteRuleList();
    }

    static async getRewriteByRule(ruleName) {
        return await Nginx.getRewriteByRule(ruleName);
    }

    static async saveBasicInfo(confName, websiteInfo) {
        const website = new NginxWebsite(confName);
        await website.init()
        await website.setBasicInfo(websiteInfo);
        await website.save();
    }

    static async saveRewrite(confName, content) {
        await NginxWebsite.saveRewrite(confName, content);
    }
}
