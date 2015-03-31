<%inherit file="base.mako"/>

<%def name="title()">Two Factor Authentication</%def>

<%def name="content()">
    ## TODO refactor base.mako to inherit from another, higher level
    ## template with just the assets to avoid this css magic /hrybacki
    <style>
          .footer, .copyright, .osf-nav-wrapper  {
            display: none;
          }
    </style>

    <form class="form col-md-4 col-md-offset-4"
            id="twoFactorSignInForm"
            class="form"
            ## TODO: Use web_url_for /hrybacki
            % if next_url:
                action="${ web_url_for('two_factor') }?next=${next_url}"
            % else:
                action="${ web_url_for('two_factor') }"
            % endif
            method="POST"
            name="signin"
        >
        <div class="panel panel-osf">
            <div class="panel-heading">Two Factor Code</div>
                <div class="panel-body">
                    <input class="form-control" name="twoFactorCode" placeholder="Enter two factor code" autocomplete="off" autofocus=""/>
                    <button type="submit" class="btn btn-success pull-right m-t-md">Verify</button>
                </div>
        </div>
        <hr class="m-t-lg m-b-sm"/>
        <h6 class="text-center text-muted text-300"><a href="${ web_url_for('auth_login') }">Back to OSF</a></h6>
    </form>

</%def>

<%def name="javascript_bottom()">
    <script src=${"/static/public/js/twofactor-page.js" | webpack_asset}></script>
</%def>
