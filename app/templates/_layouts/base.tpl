<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    {* Title, description, keywords *}
    {block 'seo'}
        {render_meta:raw}
    {/block}

    <link rel="stylesheet" href="{$.assets_public_path('main.css', 'frontend')}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

    {* Another head information *}
    {block 'head'}{/block}
</head>
<body>
    <div class="layout">
        <div class="layout__wrapper">
            <div id="main" class="layout__main">
                {block 'main'}
                    <div class="layout__content">
                        {block 'before-content'}

                        {/block}

                        <div class="row">
                            <div class="column large-12">
                                {block 'content'}

                                {/block}
                            </div>
                        </div>

                        {block 'after-content'}

                        {/block}
                    </div>
                {/block}
            </div>
        </div>
    </div>

    {block 'core_js'}
        <script src="{$.assets_public_path('vendors.js', 'frontend')}"></script>
        <script src="{$.assets_public_path('main.js', 'frontend')}"></script>
    {/block}

    {render_dependencies_js:raw}
    {render_inline_js:raw}
    {render_dependencies_css:raw}
    {render_inline_css:raw}
    {block 'js'}

    {/block}
    {raw $.setting('Main.counters')}
</body>
</html>