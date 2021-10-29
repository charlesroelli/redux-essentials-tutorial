import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = ({ match}) => {
    const { postId } = match.params

    const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

    let content
    if (isFetching) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content =  (
            <article className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.user} />
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
                <ReactionButtons post={post} />
            </article>
        )
    }

    return <section>{content}</section>
}