let defaultSettings = {
    explicitConsent: !0,
    position: "top",
    duration: 10,
    limit: 0,
    message: null,
    cookieScripts: null,
    privacyPolicyUri: "privacy.html",
    scriptWrapper: function() {},
    customDialogSelector: null,
    fontFamily: "helvetica",
    fontColor: "#FFFFFF",
    fontSize: "13px",
    backgroundColor: "#000000",
    bgOpacity: 100,
    linkColor: "#CA0000",
    underlineLink: !0,
    textButton: null,
    rejectText: null,
    colorButton: "",
    positionOffset: "0",
    animate: !0,
    callback: function() {}
};
class cookiesDirective {
    constructor(e) {
        let t = Object.assign({}, defaultSettings, e);
        checkConsentAndExecute(t)
    }
}
function invertHex(e) {
    return e = e.slice(1),
    .299 * parseInt(e.slice(0, 2), 16) + .587 * parseInt(e.slice(2, 4), 16) + .114 * parseInt(e.slice(4, 6), 16) > 186 ? "#000000" : "#FFFFFF"
}
"undefined" != typeof $ && ($.cookiesDirective = function(e) {
    var t = $.extend(defaultSettings, e);
    checkConsentAndExecute(t)
}
,
$.cookiesDirective.loadScript = function(e) {
    var t = $.extend({
        uri: "",
        appendTo: "body"
    }, e)
      , o = String(t.appendTo)
      , i = document.createElement("script");
    switch (i.src = t.uri,
    i.type = "text/javascript",
    i.onload = i.onreadystatechange = function() {
        i.readyState && "loaded" != i.readyState && i.readyState
    }
    ,
    t.appendTo) {
    case "head":
        $("head").append(i);
        break;
    case "body":
        $("body").append(i);
        break;
    default:
        $("#" + o).append(i)
    }
}
);
var checkConsentAndExecute = function(e) {
    if (getCookie("cookiesDirective"))
        e.scriptWrapper();
    else {
        if (e.limit > 0) {
            if (getCookie("cookiesDisclosureCount")) {
                var t = getCookie("cookiesDisclosureCount");
                t++,
                setCookie("cookiesDisclosureCount", t, 1)
            } else
                setCookie("cookiesDisclosureCount", 1, 1);
            e.limit >= getCookie("cookiesDisclosureCount") && disclosure(e)
        } else
            disclosure(e);
        e.explicitConsent ? document.getElementById("explicitsubmit").addEventListener("click", ( () => {
            e.scriptWrapper()
        }
        )) : e.scriptWrapper()
    }
}
  , getCookie = function(e) {
    for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
        for (var r = o[i]; " " == r.charAt(0); )
            r = r.substring(1, r.length);
        if (0 === r.indexOf(t))
            return r.substring(t.length, r.length)
    }
    return null
}
  , setCookie = function(e, t, o) {
    var i = "";
    if (o) {
        var r = new Date;
        r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3),
        i = "; expires=" + r.toGMTString()
    }
    document.cookie = e + "=" + t + i + "; path=/"
}
  , checkIE = function() {
    var e;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var t = navigator.userAgent;
        if (null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(t) && (e = parseFloat(RegExp.$1)),
        e <= 8)
            return !0;
        if (9 == e) {
            if ("BackCompat" == document.compatMode) {
                var o = document.createElement("meta");
                return o.content = "IE=EmulateIE8",
                document.getElementsByTagName("head")[0].appendChild(o),
                !0
            }
            return !1
        }
        return !1
    }
    return !1
}
  , disclosure = function(e) {
    var t = e;
    t.css = "fixed",
    checkIE() && (t.position = "top",
    t.css = "absolute");
    var o = "";
    if (t.cookieScripts) {
        var i = t.cookieScripts.split(",")
          , r = i.length
          , n = "";
        if (r > 1) {
            for (var c = 0; c < r - 1; c++)
                n += i[c] + ", ";
            o = " We use " + n.substring(0, n.length - 2) + " and " + i[r - 1] + " scripts, which all set cookies. "
        } else
            o = " We use a " + i[0] + " script which sets cookies."
    }
    if (t.customDialogSelector) {
        let e = document.querySelector("#cookie-dialog");
        if (!e)
            return;
        let o = e.querySelector("#cookiesdirective");
        if (!o)
            return;
        let i = e.querySelector(".cookie-wrapper");
        if (t.explicitConsent) {
            let e;
            if (o.querySelector("#accept") || (e = document.createElement("div"),
            e.id = "accept",
            e.style = "display: flex;justify-content: center;align-items: center;margin-bottom:1rem;"),
            !e)
                return;
            if (i.appendChild(e),
            "2" === t.cookiesAlertType) {
                let o = document.createElement("a");
                o.id = "explicitreject",
                o.innerText = t.rejectText || "Reject",
                o.classList.add("btn"),
                o.classList.add("btn-white"),
                o.classList.add("display-7"),
                o.setAttribute("style", "margin:0 5px;" + (t.rejectColor ? " background-color:" + t.rejectColor + " !important;color:" + invertHex(t.rejectColor) + "!important;" : "") + "border-color:" + t.rejectColor + " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"),
                e.appendChild(o)
            }
            if (!o.querySelector("a#explicitsubmit")) {
                let o = document.createElement("a");
                o.id = "explicitsubmit",
                o.innerText = t.textButton || "Continue",
                o.classList.add("btn"),
                o.classList.add("btn-primary"),
                o.classList.add("display-7"),
                o.setAttribute("style", "margin:0 5px;" + (t.colorButton ? " background-color:" + t.colorButton + " !important;color:" + invertHex(t.colorButton) + "!important;" : "") + "border-color:" + t.colorButton + " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"),
                e.appendChild(o),
                console.warn('cookiesDirective: Submit button with ID "explicitsubmit" does not exist in custom dialog, so automatically added')
            }
        } else if (!o.querySelector("a#impliedsubmit")) {
            let e = document.createElement("a");
            e.id = "impliedsubmit",
            e.value = "Do not show this message again",
            o.appendChild(e),
            console.warn('cookiesDirective: Submit button with ID "impliedsubmit" does not exist in custom dialog, so automatically added')
        }
        let r = e.querySelector("#epdnotick");
        r && (r.style.display = "none"),
        "none" !== getComputedStyle(e, null).display && console.error('cookiesDirective: Custom dialog element should have CSS style display: "none".'),
        e.style.display = "block"
    } else {
        document.querySelector("#cookiesdirective") && document.querySelector("#cookiesdirective").remove();
        let e = document.createElement("div");
        e.setAttribute("id", "epd");
        let i = document.createElement("div");
        i.setAttribute("id", "cookiesdirective");
        var a = t.backgroundColor || "rgb(255,255,255)"
          , s = "rgba($2,$3,$4," + .01 * (t.bgOpacity || 100) + ")";
        i.setAttribute("style", "font-family:sans-serif;position:" + t.css + ";" + t.position + ":-300px;left:0px;width:100%;height:auto;background:" + a.replace(/(rgba?)\(([0-9]+),\s+([0-9]+),\s+([0-9]+)(,\s+(\d?\.?\d+))?\)/, s) + ";color:" + t.fontColor + ";text-align:center;z-index:1050;");
        let r = document.createElement("div");
        r.classList.add("cookie-wrapper"),
        r.setAttribute("style", "position:relative;height:auto;width:90%;padding:10px;margin-left:auto;margin-right:auto;");
        let n = document.createElement("div");
        n.classList.add("mbr-text");
        let c = document.createElement("p");
        if (c.classList.add("display-7"),
        c.classList.add("alert-message"),
        c.style.margin = "1rem 0",
        t.message || (t.explicitConsent ? (t.message = "This site uses cookies. Some of the cookies we ",
        t.message += "use are essential for parts of the site to operate and have already been set.") : t.message = "We have placed cookies on your computer to help make this website better."),
        c.innerHTML = t.message,
        t.explicitConsent) {
            let e = document.createTextNode(o);
            c.appendChild(e);
            let i = document.createElement("div");
            i.setAttribute("id", "epdnotick"),
            i.setAttribute("style", "color:#ca0000;display:none;margin:2px;");
            let a = document.createElement("div");
            if (a.classList.add("accept"),
            a.setAttribute("style", "display:flex;justify-content:center;align-items:center;margin-bottom:1rem;"),
            "2" === t.cookiesAlertType) {
                let e = document.createElement("a");
                e.id = "explicitreject",
                e.innerText = t.rejectText || "Reject",
                e.classList.add("btn"),
                e.classList.add("btn-white"),
                e.classList.add("display-7"),
                e.setAttribute("style", "margin:0 5px;" + (t.rejectColor ? " background-color:" + t.rejectColor + " !important;color:" + invertHex(t.rejectColor) + "!important;" : "") + "border-color:" + t.rejectColor + " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"),
                a.appendChild(e)
            }
            let s = document.createElement("a");
            s.id = "explicitsubmit",
            s.innerText = t.textButton || "Continue",
            s.classList.add("btn"),
            s.classList.add("btn-primary"),
            s.classList.add("display-7"),
            s.setAttribute("style", "margin:0 5px;" + (t.colorButton ? " background-color:" + t.colorButton + " !important;color:" + invertHex(t.colorButton) + "!important;" : "") + "border-color:" + t.colorButton + " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"),
            a.appendChild(s),
            n.appendChild(c),
            n.appendChild(a),
            n.appendChild(i),
            r.appendChild(n)
        } else {
            let e = document.createTextNode(o);
            c.appendChild(e),
            n.appendChild(c);
            let i = document.createElement("div");
            i.classList.add("mbr-section-btn");
            let a = document.createElement("a");
            a.setAttribute("style", "margin:0;" + (t.colorButton ? " background-color:" + t.colorButton + " !important;color:" + invertHex(t.colorButton) + "!important;" : "") + (t.colorButton && self === top ? "border-color:" + t.colorButton + " !important;" : "")),
            a.id = "impliedsubmit",
            a.setAttribute("class", "btn btn-sm btn-primary display-7"),
            a.appendChild(document.createTextNode(t.textButton)),
            i.appendChild(a),
            r.appendChild(n),
            r.appendChild(i)
        }
        i.appendChild(r),
        e.appendChild(i),
        Array.from(e.querySelectorAll("a")).filter((e => !e.classList.contains("btn"))).forEach((e => {
            e.setAttribute("style", "color: " + t.linkColor + ";text-decoration:" + (!0 === t.underlineLink || "true" === t.underlineLink ? "underline" : "none") + ";")
        }
        )),
        document.body.appendChild(e)
    }
    var l = t.position.toLowerCase();
    "top" != l && "bottom" != l && (l = "top");
    var d = {
        in: null,
        out: null
    };
    "top" == l ? (d.in = {
        top: t.positionOffset
    },
    d.out = {
        top: "-300px"
    }) : (d.in = {
        bottom: t.positionOffset
    },
    d.out = {
        bottom: "-300px"
    }),
    -1 !== location.href.search("privacy.html") && dialog.remove();
    let p = document.querySelector("#cookiesdirective")
      , u = e => p.style[l] = e[l]
      , m = (e, t) => {
        let o = Object.keys(t)[0]
          , i = "0" == t[l] ? "-300px" : "0"
          , r = getComputedStyle(e, null)[l];
        return [{
            [o]: r || i
        }, t]
    }
    ;
    p.animate(m(p, d.in), {
        duration: t.animate ? 1e3 : 0
    }).onfinish = function() {
        if (u(d.in),
        t.explicitConsent) {
            let e = document.querySelector("#explicitsubmit")
              , o = document.querySelector("#explicitreject");
            e.addEventListener("click", ( () => {
                if (setCookie("cookiesDirective", 1, 365),
                t.customDialogSelector)
                    return void p.remove();
                p.animate(m(p, d.out), {
                    duration: 1e3
                }).onfinish = function() {
                    u(d.out),
                    p.remove()
                }
            }
            )),
            o && o.addEventListener("click", ( () => {
                p.animate(m(p, d.out), {
                    duration: 1e3
                }).onfinish = function() {
                    u(d.out),
                    p.remove()
                }
            }
            ))
        } else {
            let e = document.querySelector("#impliedsubmit");
            e.addEventListener("click", ( () => {
                if (e.matches("[demo]"))
                    return;
                setCookie("cookiesDirective", 1, 365),
                p.animate(m(p, d.out), {
                    duration: t.animate ? 1e3 : 0
                }).onfinish = function() {
                    u(d.out),
                    p.remove()
                }
            }
            ))
        }
        t.duration > 0 && setTimeout((function() {
            p.animate([{
                opacity: "1"
            }, {
                opacity: "0"
            }], {
                duration: 2e3
            }).onfinish = function() {
                p.style.opacity = "0",
                p.style[l] = "-300px"
            }
        }
        ), 1e3 * t.duration),
        t.callback()
    }
};
