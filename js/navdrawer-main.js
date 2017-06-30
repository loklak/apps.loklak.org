    $(document).ready(function () {
    $(".menu-drawer").click(function () {
        openNav();
        $(this).css("display", "none");
    });
    $(".sidebar-header-close").click(function () {
        closeNav();
        $(".menu-drawer").css("display", "block");
    });
});

function openNav()
{
    $(".sidebar").animate({
        left: "-0px"
    }, 300);
    $(".sidebar").css("box-shadow", "0 36px 36px 26px rgba(0,0,0,0.4)");
    $("body").css("overflow-y", "hidden");
}

function closeNav()
{
    $(".sidebar").animate({
        left: "-400px"
    }, 300);
    $(".sidebar").css("box-shadow", "0 26px 26px 0px rgba(0,0,0,0.2)");
    $("body").css("overflow-y", "auto");
}
