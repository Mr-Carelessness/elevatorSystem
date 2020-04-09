package cn.edu.zucc.elevator.entity;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class AES {
	private static String key = "123456";
	
    public static String getKey() {
		return key;
	}

	/*** 加密
     * 
     * @param content
         *            需要加密的内容
     * @param password
         *            加密密码
     * @return
     */
    public static byte[] encrypt(String content, String password) {
        try {
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            kgen.init(128, new SecureRandom(password.getBytes()));
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            byte[] byteContent = content.getBytes("utf-8");
            cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(byteContent);
            return result; // 加密
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /*** 解密
     * 
     * @param content
         *            待解密内容
     * @param password
         *            解密密钥
     * @return
     */
    public static byte[] decrypt(byte[] content, String password) {
        try {
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            kgen.init(128, new SecureRandom(password.getBytes()));
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            cipher.init(Cipher.DECRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(content);
            return result; // 加密
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /*** 将二进制转换成16进制
     * 
     * @param buf
     * @return
     */
    public static String parseByte2HexStr(byte buf[]) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < buf.length; i++) {
            String hex = Integer.toHexString(buf[i] & 0xFF);
            if (hex.length() == 1) {
                hex = '0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }

    /*** 将16进制转换为二进制
     * 
     * @param hexStr
     * @return
     */
    public static byte[] parseHexStr2Byte(String hexStr) {
        if (hexStr.length() < 1)
            return null;
        byte[] result = new byte[hexStr.length() / 2];
        for (int i = 0; i < hexStr.length() / 2; i++) {
            int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
            int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2), 16);
            result[i] = (byte) (high * 16 + low);
        }
        return result;
    }

    /*** 加密
     *
     * @param content
         *            需要加密的内容
     * @param password
         *            加密密码
     * @return
     */
    public static byte[] encrypt2(String content, String password) {
        try {
            SecretKeySpec key = new SecretKeySpec(password.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
            byte[] byteContent = content.getBytes("utf-8");
            cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(byteContent);
            return result; // 加密
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public static String encrypt(String rawstr) {
    	 String content = rawstr;
         String password = AES.getKey();
         // 加密
         // System.out.println("加密前：" + content);
         byte[] encode = encrypt(content, password);
         //传输过程,不转成16进制的字符串，就等着程序崩溃掉吧
         String code = parseByte2HexStr(encode);
         //System.out.println("密文字符串：" + code);
         return code;
         //byte[] decode = parseHexStr2Byte(code);
         // 解密
         //byte[] decryptResult = decrypt(decode, password);
         //System.out.println("解密后：" + new String(decryptResult, "UTF-8")); //不转码会乱码
    }
    
    
    public static void main(String[] args) throws UnsupportedEncodingException {
        String content = "我是";
        String password = "12345678";
        // 加密
        System.out.println("加密前：" + content);
        byte[] encode = encrypt(content, password);
        
        //传输过程,不转成16进制的字符串，就等着程序崩溃掉吧
        String code = parseByte2HexStr(encode);
        System.out.println("密文字符串：" + code);
        byte[] decode = parseHexStr2Byte(code);
        // 解密
        byte[] decryptResult = decrypt(decode, password);
        System.out.println("解密后：" + new String(decryptResult, "UTF-8")); //不转码会乱码
         
    }
}
// 参考来源：https://www.cnblogs.com/shoneworn/p/5071305.html