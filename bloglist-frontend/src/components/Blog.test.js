import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', ()=>{
    const blog = {
        author: 'seppo',
        title: 'Moikamoi',
        url: 'hehe'
    }

    const component = render(
        <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(
        'Moikamoi seppo'
    )
})