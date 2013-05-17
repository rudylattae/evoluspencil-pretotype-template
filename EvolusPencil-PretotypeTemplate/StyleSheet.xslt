<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:p="http://www.evolus.vn/Namespace/Pencil"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns="http://www.w3.org/1999/xhtml">
<xsl:output method="html"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="/p:Document/p:Properties/p:Property[@name='fileName']/text()"/>
                </title>
                <style>
                    html, body {
                        margin: 0;
                        padding: 0;
                    }
                    .page { 
                        margin: 0;
                        padding: 0;
                        width: 100%;
                    }
                    .notes { 
                        background-color: #000;
                        position: fixed;
                        box-sizing:border-box;
                        -webkit-box-sizing:border-box;
                        -moz-box-sizing:border-box;
                        width: 100%;
                        height: 40%;
                        opacity: 0.9;
                        color: #fff;
                        padding: 0;
                        margin: 0;
                        bottom: -40%;
                    }
                        .notes .open {
                            display: block;
                            position: absolute;
                            top: -30px;
                            right: 25px;
                            padding: 0.5em;
                            color: black;
                            cursor: pointer;
                        }
                        .notes .close {
                            position: absolute;
                            top: 10px;
                            right: 25px;
                            color: #fff;
                            background: rgba(255,255,255,0.5);
                            padding: 0.5em;
                            font-family: "Lucida Console";
                            cursor: pointer;
                            display: none;
                        }
                        .notes .content {
                            margin: 0;
                            padding: 0.5em;
                            box-sizing:border-box;
                            -webkit-box-sizing:border-box;
                            -moz-box-sizing:border-box;
                            overflow: auto;
                            width: 100%;
                            height: 100%;
                        }
                    .notes.visible {
                        bottom: 0;
                    }
                        .notes.visible .open {
                            display: none;
                        }
                        .notes.visible .close {
                            display: block;
                        }
                </style>

                <script type="text/javascript" src="Resources/path.min.js">
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
                <div class="notes visible">
                    <span class="open">notes</span>
                    <span class="close">X</span>
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
            coords="{@x},{@y},{@x+@w},{@y+@h}" href="#/page/{@targetFid}" title="Go to page '{@targetName}'"/>
    </xsl:template>
    
    <xsl:template match="html:*" mode="processing-notes">
        <xsl:copy>
            <xsl:copy-of select="@*[local-name() != '_moz_dirty']"/>
            <xsl:apply-templates mode="processing-notes"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="html:a[@page-fid]" mode="processing-notes">
        <a href="#/page/{@page-fid}" title="Go to page '{@page-name}'">
            <xsl:copy-of select="@class|@style"/>
            <xsl:apply-templates mode="processing-notes"/>
        </a>
    </xsl:template>
</xsl:stylesheet>
