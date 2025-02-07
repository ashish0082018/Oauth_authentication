


export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>  
          <div className="bg-zinc-200"> 
          
         
        {children}
          </div>
        </body>
      </html>
    );
  }
  