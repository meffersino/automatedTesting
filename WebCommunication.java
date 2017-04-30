import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Collection;
import java.util.ArrayList;

import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.framing.Framedata;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;


/**
* Sets up a WebSocket server
*@file WebCommunication.java
*@author Michael Jeffrey, Jason Huggins
*@date 30/4/2017
*/


public class WebCommunication extends WebSocketServer{
	
	/**
	* The port which the server shall be hosted on
	*/
	public static final int PORT = 8080;

	public WebCommunication() throws UnknownHostException {
		super(new InetSocketAddress(PORT));
	}

	public WebCommunication(int port) throws UnknownHostException {
		super( new InetSocketAddress(port));
	}

	public WebCommunication(InetSocketAddress address) {
		super(address);
	}

	/**
	* When a connection is made, announce this to all other connections 
	*@param conn The connection instance 
	*@param handshake  The HTTP Request-URI
	*/
	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		this.sendToAll("new connection: " + handshake.getResourceDescriptor());
		System.out.println(conn.getRemoteSocketAddress().getAddress().getHostAddress() + " entered the room!");
	}

	/**
	* When a connection is ended, announce this to all other connections 
	*@param conn The connection instance 
	*@param code The code representing why the connection ended
	*@param reason The string representing why the connection ended
	*@param remote States whether the connection ending was initiated by the remote host
	*/
	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		this.sendToAll(conn + " has left the room!");
		System.out.println(conn + " has left the room!");
	}

	/**
	* When a is received, announce this to all other connections 
	*@param conn The connection instance 
	*@param message The message to be sent on
	*/
	@Override
	public void onMessage(WebSocket conn, String message) {
		// if(message.equalsIgnoreCase("Robert ready")) {
		// 		System.out.println("Confirmed robot ready");
		// 		sendByteToAll();
		// 	}
		this.sendToAll(message);
		System.out.println(conn + ": " + message);
	}

	/**
	* When a message is received, announce this to all other connections 
	*@param conn The connection instance 
	*@param fragment The frame fragment
	*/
	@Override
	public void onFragment(WebSocket conn, Framedata fragment) {
		System.out.println("received fragment: " + fragment);
	}

	public static void main(String[] args) throws InterruptedException , IOException {
		WebSocketImpl.DEBUG = true;
		/*int port = 8887; // 843 flash policy port
		try {
			port = Integer.parseInt(args[ 0 ]);
		} catch (Exception ex) {
		}*/
		WebCommunication s = new WebCommunication();
		s.start();
		System.out.println("WebCommunication started on port: " + s.getPort());

		BufferedReader sysin = new BufferedReader(new InputStreamReader(System.in));
		while (true) {
			String in = sysin.readLine();
			s.sendToAll( in );
			if(in.equalsIgnoreCase("Robert ready")) {
				System.out.println("Confirmed robot ready");
				s.sendByteToAll();
			}else if(in.equals("exit")) {
				s.stop();
				break;
			} else if(in.equals("restart")) {
				s.stop();
				s.start();
				break;
			}
		}
	}

	/**
	* When an error is received, print the error
	*@param conn The connection instance 
	*@param ex The error
	*/
	@Override
	public void onError(WebSocket conn, Exception ex) {
		ex.printStackTrace();
		if( conn != null ) {
			// some errors like port binding failed may not be assignable to a specific websocket
		}
	}

	/**
	* Sends <var>text</var> to all currently connected WebSocket clients
	* @param text The String to send across the network
	*/
	public void sendToAll(String text) {
		Collection<WebSocket> connect = connections();
		synchronized (connect) {
			for(WebSocket c : connect) {
				c.send(text);
			}
		}
	}
	/**
	* Sends a set byte array to all connected clients, aiming to reach the robot
	*/
	public void sendByteToAll() {
		String[] testStr = {"move","*","0","*","0","*","-140","*"};
		byte[] tester = stringToByte(testStr);
		Collection<WebSocket> connect = connections();
		synchronized (connect) {
			for(WebSocket c:connect) {
				c.send(tester);
			}
		}
	}


	/**
	* Converts a String array into a byte array
	*@param stringArray The String array to be converted
	*@return data The converted byte array
	*/
	public static byte[] stringToByte(String[] stringArray) {
        ArrayList<Byte> tempData = new ArrayList<Byte>();
        byte[] finishedData;
        for (int i = 0; i < stringArray.length; i++) {
            String string = stringArray[i];
            finishedData = string.getBytes();
            for(byte x:finishedData) {
                tempData.add(x);
            }
        }
        Byte[] dataByte = tempData.toArray(new Byte[tempData.size()]);
        byte[] data = new byte[dataByte.length];
        for(int i = 0; i < dataByte.length; i++) {
            data[i] = dataByte[i];
        }
        return data;
    }
}