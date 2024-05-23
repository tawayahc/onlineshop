import React from 'react';

function Category() {
    return (
        /* Main Content */
        <div className="mx-auto py-8 items-center" style={{ maxWidth: '1200px', display: 'flex', marginLeft: '156px', marginTop: '-20px' }}>
            <ul className="menu-vertical px-1 text-base">
            {/* Product Categories */}
                <li className="mb-5">
                    <a href="/ProductCategory1">Category 1111111111111</a>
                </li>
                <li className="mb-5">
                    <a href="/ProductCategory2">Category 2222222222222</a>
                </li>
                <li className="mb-5">
                    <a href="/ProductCategory3">Category 3333333333333</a>
                </li>
                <li className="mb-5">
                    <a href="/ProductCategory4">Category 4444444444444</a>
                </li>
                <li className="mb-5">
                    <a href="/ProductCategory5">Category 5555555555555</a>
                </li>
                <li className="mb-5">
                    <a href="/ProductCategory6">Category 6666666666666</a>
                </li>
                <li>
                    <a href="/ProductCategory7">Category 7777777777777</a>
                </li>
            </ul>      
        </div>
    );
}

export default Category;
