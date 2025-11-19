export const otpTemplate = (otp: string) => {
    return `
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #0e0f11;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #e2e2e2;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #181a1d;
                border-radius: 12px;
                padding: 35px;
                box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
                border: 1px solid #27292d;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #2e3034;
            }
            .header h1 {
                color: #1dbf73;
                margin: 0;
                font-size: 30px;
                font-weight: 800;
            }
            .content {
                margin-top: 25px;
                text-align: center;
            }
            .content p {
                font-size: 16px;
                color: #cfcfcf;
                line-height: 1.6;
            }
            .otp-box {
                margin: 35px auto;
                background-color: #1dbf73;
                color: #fff;
                font-size: 30px;
                font-weight: bold;
                padding: 18px 32px;
                border-radius: 8px;
                display: inline-block;
                letter-spacing: 8px;
                box-shadow: 0 4px 12px rgba(29, 191, 115, 0.4);
            }
            .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 13px;
                color: #777;
                padding-top: 15px;
                border-top: 1px solid #2e3034;
            }
            .footer a {
                color: #1dbf73;
                text-decoration: none;
                margin: 0 5px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="header">
                <h1>WORKORA</h1>
            </div>

            <div class="content">
                <p>Hello,</p>
                <p>Your Workora account verification code is shown below.</p>
                
                <div class="otp-box">${otp}</div>

                <p>The code expires in <strong>10 minutes</strong>.</p>
            </div>

            <div class="footer">
                <p>Thank you for choosing <strong>Workora</strong>.</p>
                <p><a href="#">Support</a> | <a href="#">About</a> | <a href="#">Help</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};
