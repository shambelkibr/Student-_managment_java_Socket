package com.Distributed_GUI.Server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class G_server {
    public static void main(String[] args) throws Exception {

        ServerSocket server = new ServerSocket(5000);
        System.out.println("Java Server started...");

        while (true) {
            Socket socket = server.accept();

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            PrintWriter out = new PrintWriter(
                    socket.getOutputStream(), true);

            String message = in.readLine();
            System.out.println("Client: " + message);

            // response
            out.println("Received from Java: " + message);

            socket.close(); // ✅ only close client
        }
    }
}