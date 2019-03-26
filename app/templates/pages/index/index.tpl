{extends "_layouts/base.tpl"}

{block 'main'}
    <div class="index-main__container" id="container">

    </div>
{/block}

{block "core_js"}
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    {parent}
{/block}