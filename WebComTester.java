import java.util.Arrays;

public class WebComTester {
	public static void main(String[] args) throws Exception{
		WebCommunication testInstance = new WebCommunication();
		String[] test1 = {};
		String[] test2 = {"move","*","0","*","0","*","-100"};

		byte[] expected1 = {};
		byte[] expected2 = {109,111,118,101,42,48,42,48,42,45,49,48,48};

		byte[] result1 = testInstance.stringToByte(test1);
		byte[] result2 = testInstance.stringToByte(test2);

		if(Arrays.equals(expected1,result1)) {
			System.out.println("Test 1 successful");
		} else {
			System.out.println("Test 1 failed");
		}
		if(Arrays.equals(expected2,result2)){
			System.out.println("Test 2 successful");
		} else {
			System.out.print("Test 2 failed");
		}
	}
}