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
    $(".sidebar").css("width", "260px");
    $(".sidebar").css("box-shadow", "0 36px 36px 26px rgba(0,0,0,0.4)");
}

function closeNav()
{
    $(".sidebar").css("width", "0px");
    $(".sidebar").css("box-shadow", "0 26px 26px 0px rgba(0,0,0,0.2)");
}
