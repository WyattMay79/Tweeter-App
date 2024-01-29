export class Post {
    postId?: number;
    title?: string;
    content?: string;

    constructor(id?: number, title?: string, content?: string,) {
        this.postId = id;
        this.title = title;
        this.content = content;
    }
}
