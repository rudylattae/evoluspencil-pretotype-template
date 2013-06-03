<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:p="http://www.evolus.vn/Namespace/Pencil"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns="http://www.w3.org/1999/xhtml">
<xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="/p:Document/p:Properties/p:Property[@name='fileName']/text()"/>
                </title>

                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="translucent black" />
                <link rel="apple-touch-icon-precomposed" href="Resources/images/icon_57x57.png">
                <link rel="apple-touch-icon-precomposed" sizes="72x72" href="Resources/images/icon_72x72.png">
                <link rel="apple-touch-icon-precomposed" sizes="114x114" href="Resources/images/icon_114x114.png">
                <link rel="apple-touch-icon-precomposed" sizes="144x144" href="Resources/images/icon_144x144.png">

                <link rel="icon" type="image/png" href="Resources/images/favicon.png" />

                <link rel="stylesheet" type="text/css" href="Resources/style.css"/>
                <script type="text/javascript" src="Resources/lib.js">
                    //
                </script>
            </head>
            <body>
                <xsl:apply-templates select="/p:Document/p:Pages/p:Page" />

                <script type="text/javascript" src="Resources/main.js">
                    //
                </script>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="p:Page">
        <div class="page" id="{p:Properties/p:Property[@name='fid']/text()}">
            <img src="pages/{p:Properties/p:Property[@name='fid']/text()}.png"
                width="{p:Properties/p:Property[@name='width']/text()}"
                height="{p:Properties/p:Property[@name='height']/text()}"
                usemap="#map_{p:Properties/p:Property[@name='fid']/text()}"/>
            <xsl:if test="p:Note/node()">
                <div class="notes">
                    <span class="open control" title="Show Notes">?</span>
                    <span class="close control" title="Hide Notes">X</span>
                    <div class="content">
                        <xsl:apply-templates select="p:Note/node()" mode="processing-notes"/>
                    </div>
                </div>
            </xsl:if>
            <map name="map_{p:Properties/p:Property[@name='fid']/text()}">
                <xsl:apply-templates select="p:Links/p:Link" />
            </map>
        </div>
    </xsl:template>

    <xsl:template match="p:Link">
        <area shape="rect"
            coords="{@x},{@y},{@x+@w},{@y+@h}" href="#/page/{@targetFid}" title="{@targetName}"/>
    </xsl:template>
    
    <xsl:template match="html:*" mode="processing-notes">
        <xsl:copy>
            <xsl:copy-of select="@*[local-name() != '_moz_dirty']"/>
            <xsl:apply-templates mode="processing-notes"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="html:a[@page-fid]" mode="processing-notes">
        <a href="#/page/{@page-fid}" title="{@page-name}">
            <xsl:copy-of select="@class|@style"/>
            <xsl:apply-templates mode="processing-notes"/>
        </a>
    </xsl:template>
</xsl:stylesheet>
