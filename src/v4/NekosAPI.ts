import { URL } from "url";
import Base from "../base";
import { CustomProxy } from "../Proxy";
import { preventRateLimit } from "./preventRateLimit";
import { TagNames, Tags } from "./types/Tags";
import { ArrayResponse, NekosImage } from "./types/nekosImage";
import { BaseImageOptions, FullImageOptions } from "./types/baseImageOptions";
import { IntRange } from "./types/IntRange";

export class NekosAPI extends Base {
    private readonly baseUrl: string;
    /*
    * Last time a request was sent to the API
    */
    public static lastRequest = new Date();

    public constructor(proxy?: CustomProxy) {
        super(proxy);
        this.baseUrl = "https://api.nekosapi.com/v4/";
        NekosAPI.lastRequest = new Date();
    }

    @preventRateLimit()
    public async getImage(tags?: TagNames | TagNames[], options?: BaseImageOptions): Promise<NekosImage> {
        const optionsWithLimit = Object.assign({ limit: 1 as IntRange<1, 1> }, options)
        return (await this._getImages(tags, optionsWithLimit))[0];
    }

    @preventRateLimit()
    public async getImages(tags?: TagNames | TagNames[], options?: FullImageOptions): Promise<NekosImage[]> {
        return (await this._getImages(tags, options))
    }

    private async _getImages(tags: TagNames | TagNames[], options: FullImageOptions): Promise<NekosImage[]> {
        const baseUrl = new URL(`${this.baseUrl}images?`);
        const url = this.processSearchParams(baseUrl, tags, options);
        return (await this.fetchResponse<ArrayResponse<NekosImage>>(url)).items
    }

    @preventRateLimit()
    public async getRandomImage(tags?: TagNames | TagNames[], options?: BaseImageOptions): Promise<NekosImage> {
        const optionsWithLimit = Object.assign({ limit: 1 as IntRange<0, 1> }, options)
        return (await this._getRandomImages(tags, optionsWithLimit))[0];
    }

    private async _getRandomImages(tags?: TagNames | TagNames[], options?: BaseImageOptions): Promise<NekosImage[]> {
        const baseUrl = new URL(`${this.baseUrl}images/random?`);
        const url = this.processSearchParams(baseUrl, tags, options);
        return (await this.fetchResponse<NekosImage[]>(url));
    }

    @preventRateLimit()
    public async getImageByID(id: string | number): Promise<NekosImage> {
        const url = new URL(`${this.baseUrl}images/${id}`);
        return this.fetchResponse<NekosImage>(url);
    }

    private processSearchParams(url: URL, tags: TagNames | TagNames[], options: FullImageOptions) {
        const query = tags
            ? Array.isArray(tags)
                ? tags || []
                : [tags]
            : [];

        for (const tag of query) {
            url.searchParams.append("tag", String(Tags[tag]));
        }

        if (options) {
            for (const [key, value] of Object.entries(options)) {
                if (Array.isArray(value)) {
                    for (const arrayValue of value) {
                        url.searchParams.append(key, String(arrayValue));
                    }
                }
                else {
                    url.searchParams.append(key, String(value));
                }
            }
        }

        return url;
    }
}
