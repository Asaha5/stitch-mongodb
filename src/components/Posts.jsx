import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";

class Posts extends Component {
    constructor(props, context) {
        super(props, context);
        const { posts } = this.props.location.state;
        this.state = {
            posts: posts.slice(0, 50).map(({ title, author, body, comments }, idx) => ({
                key: `${idx}`,
                data: {
                    title,
                    author,
                    body: body.slice(0, 100) + "..."
                },
                children: comments.map(({body, email, author}, child_idx) => ({
                    key: `${idx}-${child_idx}`,
                    data: {
                        body: body.slice(0, 100) + "...",
                        title: email,
                        author
                    }
                }))
            }))
        }
    }

    render() {
        return (
            <div style={{height: '90%'}}>
                <TreeTable value={this.state.posts} scrollable rowClassName={this.rowClassName}>
                    <Column field="title" header="Title" expander></Column>
                    <Column field="author" header="Author"></Column>
                    <Column field="body" header="Body"></Column>
                </TreeTable>
            </div>
        )
    }

    rowClassName(node) {
        return {'p-highlight' : (node.children && node.children.length < 30)};
    }
}

export default Posts;