import netscape.javascript.*;
import java.applet.*;
import java.net.*;
import java.io.*;
import java.util.*;

public class CommunicationClass extends Applet{
	public JSObject jso;

	static final int PORT = 2000;

	public CommunicationClass() {
		System.out.println("Hello");
	};

    /*
	public void setup() throws JSException {
		jso = JSObject.getWindow(this);
		jso.call("tap", "");
	}
    */

    public void setup() {
       ServerSocket serverSocket = null;
        Socket socket = null;
        //InputStream inI = null;
        //DataInputStream in = null;
        BufferedReader in = null;
        PrintStream out = null;
        try {
            serverSocket = new ServerSocket(PORT);
        } catch (IOException e) {
            System.out.println("Server.java main():: IOException");
        }

        try {   
                System.out.println("Waiting for client...");
                socket = serverSocket.accept();
                System.out.println("Client has connected.");
                /*
                inI = socket.getInputStream();
                in = new DataInputStream(inI);
                */
                in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

                out = new PrintStream(socket.getOutputStream());
                
            } catch (IOException e) {
                System.out.println("CLient has disconnected.");
            }
        while(true) {
            System.out.print("");
        } 
    }
    /*
	public static void main(String[] args) {
		ServerSocket serverSocket = null;
        Socket socket = null;
        //InputStream inI = null;
        //DataInputStream in = null;
        BufferedReader in = null;
        PrintStream out = null;
        try {
            serverSocket = new ServerSocket(PORT);
        } catch (IOException e) {
        	System.out.println("Server.java main():: IOException");
        }

        try {   
        		System.out.println("Waiting for client...");
                socket = serverSocket.accept();
                System.out.println("Client has connected.");
                /*
                inI = socket.getInputStream();
                in = new DataInputStream(inI);
                
                in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

                out = new PrintStream(socket.getOutputStream());
                
            } catch (IOException e) {
                System.out.println("CLient has disconnected.");
            }
        while(true) {
        	System.out.print("");
        }
		//CommunicationClass c = new CommunicationClass();
		//c.setup();
	}*/
}