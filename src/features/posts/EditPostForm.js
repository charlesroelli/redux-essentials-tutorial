import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice';

export const EditPostForm = ({ match }) => {
    const { postId } = match.params

    const { data: post, isLoading: isLoadingCurrentPost } = useGetPostQuery(postId)
    const [updatePost, { isLoading: isSaving }] = useEditPostMutation()

    const [title, setTitle] = useState((post && post.title) || '');
    const [content, setContent] = useState((post && post.content) || '');

    const history = useHistory();

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setContent(post.content)
        }
    }, [post])

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = async () => {
        if (title && content) {
            await updatePost({ id: postId, title, content })
            history.push(`/posts/${postId}`);
        }
    }

    const spinner = isSaving ? <Spinner text="Saving..." /> :
        isLoadingCurrentPost ? <Spinner text="Loading..." /> : null

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" placeholder="What's on your mind?" value={title} onChange={onTitleChanged} disabled={isSaving || isLoadingCurrentPost} />
                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} disabled={isSaving || isLoadingCurrentPost} />
            </form>
            <button type="button" onClick={onSavePostClicked}>Save Post</button>
            {spinner}
        </section>
    )
}
