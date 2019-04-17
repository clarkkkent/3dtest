{extends "_layouts/base.tpl"}

{block 'main'}
    <div class="index-main__inner">
        <div class="index-main__container" id="container">

        </div>
        <ul class="index-main__options" id="options">
            <li class="index-main__options-item" style="background-image: url('../images/base/texture1.jpg')">

            </li>
            <li class="index-main__options-item" style="background-image: url('../images/base/texture2.jpg')">

            </li>
            <li class="index-main__options-item" style="background-image: url('../images/base/texture3.jpg')">

            </li>
            <li class="index-main__options-item" style="background-image: url('../images/base/texture4.jpg')">

            </li>
            <li class="index-main__options-item" style="background-image: url('../images/base/texture1.jpg')">

            </li>
        </ul>
    </div>
{/block}

{block "core_js"}
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    {parent}
{/block}