{ pkgs }: {
  deps = [
    pkgs.php82
    pkgs.nodejs-18_x
    pkgs.alpine-make-rootfs
    pkgs.gnutar
    pkgs.alpine      
    pkgs.wget         
    pkgs.curl         
    pkgs.fakeroot      
    pkgs.proot         
    pkgs.xz          
    pkgs.git      
    pkgs.vim          
    pkgs.nmap          
    pkgs.dnsutils    
    pkgs.whois        
    pkgs.netcat        
    pkgs.sqlmap       
    pkgs.nikto        
    pkgs.metasploit    
    pkgs.john         
    pkgs.hashcat    
    pkgs.neofetch    
    pkgs.figlet 
    pkgs.tmux
  ];
}
