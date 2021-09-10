---
sidebarDepth: 4
title: Javaコーディング規約 for Java11
author: Future Enterprise Coding Standards
meta:
  - name: keywords
    content: Javaコーディング規約,Java11,コーディング規約,Java,Java9
---

<page-title/>

本コーディング規約は、世の中のシステム開発プロジェクトのために無償で提供致します。  
ただし、掲載内容および利用に際して発生した問題、それに伴う損害については、フューチャー株式会社は一切の責務を負わないものとします。  
また、掲載している情報は予告なく変更することがございますので、あらかじめご了承下さい。

# はじめに

一般に利用・参照されている Java コーディング規約やガイドラインを以下に示す。本規約の作成においても、下記規約類を参照・抜粋している。

| 規約                                                   | 著作者               | URL                                                                                                                                                                                                              |
| ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code Conventions for the Java Programming Language     | Sun Microsystems     | [http://www.oracle.com/technetwork/java/codeconvtoc-136057.html](http://www.oracle.com/technetwork/java/codeconvtoc-136057.html)                                                                                 |
| Writing Robust Java Code                               | Scott W. Ambler      | [http://www.ambysoft.com/downloads/javaCodingStandards.pdf](http://www.ambysoft.com/downloads/javaCodingStandards.pdf)                                                                                           |
| オブジェクト倶楽部版 Java コーディング標準             | オブジェクト倶楽部   | [http://objectclub.jp/community/codingstandard/CodingStd.pdf](http://objectclub.jp/community/codingstandard/CodingStd.pdf)                                                                                       |
| 電通国際情報際サービス版 Java コーディング規約 2004    | 電通国際情報サービス | [http://objectclub.jp/community/codingstandard/JavaCodingStandard2004.pdf](http://objectclub.jp/community/codingstandard/JavaCodingStandard2004.pdf)                                                             |
| JJGuideline （Java - J2EE Conventions and Guidelines） | Stephan.J & JCS Team | [http://www.fedict.belgium.be/sites/default/files/downloads/Java_J2EE_conventions_and_guidelines_EN.pdf](http://www.fedict.belgium.be/sites/default/files/downloads/Java_J2EE_conventions_and_guidelines_EN.pdf) |
| Google Java Style (非公式和訳)                         | Google               | [https://kazurof.github.io/GoogleJavaStyle-ja/](https://kazurof.github.io/GoogleJavaStyle-ja/)                                                                                                                   |
| Acroquest Technology Java コーディング規約             | Acroquest Technology | [https://www.acroquest.co.jp/webworkshop/javacordingrule/Acroquest_JavaCodingStandard_6_7.pdf](https://www.acroquest.co.jp/webworkshop/javacordingrule/Acroquest_JavaCodingStandard_6_7.pdf)                     |

※ Sun Microsystems の規約は Java 草創期から一応の標準という位置づけだったが、オブジェクト指向、及び、その開発環境の普及・発展によって、設計やコーディングにおいて、直接的に有用な知識や豊富な指針を含むような優れた規約や、ツールなどによる機械的な準拠チェックと連携する規約が普及してきている。

# 規約の重要性

標準としての規約を定義し、遵守することの重要性を以下に示す。

- ソフトウェアメンテナンスにおける、可読性・保守性・拡張性の向上
- 問題を起こしやすい実装を未然に回避することによる、品質・生産性の向上
- 標準規約を通して得られる一般的な実装知識やノウハウ（＝学習効果）

## コーディングの心得

長いプログラムを記述すること（ステップ数）によって生産性が評価されたのは、過去の時代の出来事である。現在は、クラスやメソッドの役割が明確で、ロジックが読みやすく、保守性に優れたプログラムを記述することが評価される。コーディング規約は、コードの書き方に関する一種のパターンと考えることもでき、コードの保守性を向上させる具体的な方法を示している。したがって、規約の一つ一つの意図を理解し、守ることが重要になる。しかし、保守性に優れたコードを作成するためには、コーディング規約を守ることに加えて、良いコードを記述するための基本的な心構えをしっかり心に留めておく必要がある。以下では、その心得について述べる。

【コーディングの心得 5 か条】

1. 見やすさを重視せよ
2. ネーミングはわかりやすく
3. サンプルを鵜呑みにしない
4. 同じコードを二度書かない
5. 役割は一つに

### 見やすさを重視せよ

「良いコード」の基本は、「他の人が読んでもわかりやすいと感じられるコード」。コードの見やすさは、フォーマットはもちろん、ロジックの簡潔さや API の常識的な使い方などから生まれる。コーディングにあたっては、常に他の人の視点を意識しながら、見やすさに気を配って記述する必要がある。例えば、自分で記述したコードであっても、しばらくたってから読み返してみると理解に時間がかかった経験は誰にもあるはず。「3 日前に書いたコードは他人のコードと同じ」ということもよく言われる。見やすさを重視することは、他の人のためだけでなく自分のためにもなる。コードを読んでもすぐに理解できないような実装は、再考（リファクタリング）の必要がある。

### ネーミングはわかりやすく

コーディングでは、様々な変数やメソッドなどにネーミング（名前付け）する必要がある。ネーミングとは、本来、その対象の本質を表すような名前を考える作業である。大変難易度の高い作業だが、一方で適当に行ってもコードの動作は変わらないため、人によっては手を抜きがちとなる。しかし、ネーミングの良し悪しは、コードの可読性に非常に大きな影響を及ぼす。例えば、「C0001」というクラス名があるとする。これでは、何を表すクラスなのかすぐにはわからないだろう。また、「int p = 5000;」という記述があるとする。プログラマに聞くと、変数名 p は価格(Price)の略だと言うのだが、それならば略さずに、「int price = 5000;」としたほうが分かりやすいはずである。「ネーミングはわかりやすく」の背景には、読んで内容が理解できるという意味で、文章のようなプログラミングを行う、という考え方に基づく。

### サンプルを鵜呑みにしない

サンプルコードを活用すること自体は、著作権等を侵害しなければ問題ない。問題なのは、その内容や背景を理解しないまま、サンプルコードだけを鵜呑みにして、「おまじない」として表面的に適用してしまうことである。コードを「おまじない」ととらえていては、サンプルコードの間違いを気づかないまま適用してしまうこともある。例えば、ストリームのクローズ処理を行っていないサンプルコードであっても、それに気づかずに自分のコードに適用してしまい、後で思わぬ障害を引き起こすという可能性がある。サンプルコードは、そこで説明する内容に絞ったコードが多いため、このような例はよく見られる。また、サンプルコードをそのまま適用した結果、自分が記述すべきコードには必要のないコードが含まれてしまう場合もある。その場合、コードの可読性を下げる原因となる。自分のコードは、自分で深く理解して記述すべきである。

### 同じコードは二度書かない

コードをコピー・ペーストしていませんか？コピー・ペーストしてしまうと、何らかの修正をする際に、全ての個所に同じ修正をする羽目になる。同じコードが現れるようならまとめて一つにし、外に出してコールするような書き方にすべきである。同じコードをまとめる作業は、どちらかといえば、コーディング時よりリファクタリング（ソフトウェアの外部的振る舞いを変更せずに内部構造を改善する作業）で行われることが多い。しかし、コーディング時からできるだけ気をつけておきたいことでもある。

### 役割は一つに

メソッドの役割が明確で、かつ 1 つであれば単体テストが行いやすくなる。つまり、コードの「試験性」が高まる。また、役割が一つであれば、後でコードを変更する際に修正箇所がわかりやすいため、障害修正に要する時間が短くなる。つまり、コードの「保守性」があがることになる。例えば、「チェックをして実行する」機能を実現するために、checkAndDo()メソッドが存在したとする。この場合、このメソッドは check()メソッドと do()メソッドに分割すべきである。なぜなら、checkAndDo()メソッドの check()ロジックに誤りがあった場合、do()メソッドに書かれる内容まで把握する必要が生じるためである。分割してあれば、check()メソッドだけの変更で済む。このことはクラスの設計にもあてはまる。

# ネーミング規約

## 全般

- 大文字・小文字の違いで名前を区別しない。

  良い例：

  ```java
  private int carNumber;
  private int trainNumber;
  ```

  悪い例：

  ```java
  private int num;
  private int Num;
  ```

## パッケージ

- パッケージ名はすべて小文字にする
- パッケージ名は意味のある名前にする
- サブパッケージ名の重複は可能

## クラス

- クラス名は単語の先頭を大文字にする  
   良い例：

  ```java
  public class Entry {
  ```

  悪い例：

  ```java
  public class entry {
  ```

- インターフェース名、Enum 名はクラス名に準ずる

## メソッド

- コンストラクタと同じ名前のメソッドはつくらない

- メソッド名は区切りのみ大文字にする  
   良い例：

  ```java
  public String getName() {
      //・・・
  }
  ```

  悪い例：

  ```java
  public String getname() {
      //・・・
  }
  public String GETNAME() {
      //・・・
  }
  ```

- 変換メソッド名は「"`to`"+オブジェクト名」にする  
   良い例：

  ```java
  public String toString() {
  ```

  悪い例：

  ```java
  public String string() {
  ```

- ゲッターメソッド名は「"`get`"+属性名」にする  
   型が`boolean`の場合は「"`is`"+属性名」にする
- セッターメソッド名は「"`set`"+属性名」にする

- `boolean`変数を返すメソッド名は`true`/`false`の状態がわかるようにする

  良い例：

  ```java
  public boolean isAsleep() {
  }
  public boolean exists() {
  }
  public boolean hasExpired() {
  }
  ```

## 引数

- メソッドのパラメータ名とインスタンス変数名を一緒にしない  
   ただし、アクセサメソッドやコンストラクタなど、統合開発環境の機能により自動生成するものに関しては可とする。  
   アンダースコア　`_`　をつけての区別は原則禁止とする。

  良い例：

  ```java
  public double calc(double rate) {
      return this.value * rate;
  }
  ```

  悪い例：

  ```java
  public double calc(double value) {
      return this.value * value;
  }

  public double calc(double _value) {
      return this.value * _value;
  }
  ```

## 変数全般

- `boolean`変数は`true`/`false` の状態がわかるようにする

  良い例：

  ```java
  private boolean isOpen;
  ```

  悪い例：

  ```java
  private boolean flag;
  ```

- 定数は全て`static final`とし、すべて大文字、区切りは"`_`"

  良い例：

  ```java
  private static final String SYSTEM_NAME = "販売管理システム";
  ```

- 変数名は小文字とし、単語の区切りのみ大文字にする

  良い例：

  ```java
  private String thisIsString;
  ```

  変数名に固有名詞が含まれる場合、先頭をのぞき、単語の区切り以外に大文字を使用してもよい

  良い例：

  ```java
  private String thisIsIPAddress;
  ```

## ローカル変数

- スコープが狭い変数名は省略した名前でもよい  
   良い例：

  ```java
  if (・・・) {
      String s = "・・・・";
     //変数sを利用した処理 数行
  }
  ```

  悪い例：

  ```java
  String s = "・・・・";
  if (・・・) {
     //変数sを利用した処理
  }
  ・・・
  if (・・・) {
     //変数sを利用した処理
  }
  ```

  変数`s`の利用範囲が広いので役割が明確になる変数名に変更する。

- for 文のループカウンタは、ネストごとに"`i`","`j`","`k`"・・・を使う

## Enum

- Enum 名はクラス名と同じく、単語の先頭を大文字にする
- 列挙定数は定数と同じく、すべて大文字、区切りは"`_`"

  良い例：

  ```java
  enum Season {
      WINTER,
      SPRING,
      SUMMER,
      FALL
  }
  ```

  悪い例：

  ```java
  enum Season {
      winter,
      spring,
      summer,
      fall
  }
  ```

# コーディング規約

## 全般

- 原則としてオブジェクトの参照にはインターフェースを利用する  
   オブジェクトを参照する際は、そのオブジェクトの実装クラスを用いて宣言できるが、実装クラスに適切なインターフェースが存在している場合は、必ずインターフェースを用いて宣言すること。

  良い例：

  ```java
  List<Entry> list = new ArrayList<>();
  Map<String, String> map = new HashMap<>();
  ```

  悪い例：

  ```java
  ArrayList<Entry> list = new ArrayList<>();
  HashMap<String, String> map = new HashMap<>();
  ```

- 推奨されない API を使用しない  
   アノテーション`@Deprecated`で指定されたメソッドは利用しないこと。

- 使われないコードは書かない

- 宣言は適切な権限で行うこと（`public`, `protected`, `private`）

- `final` を適切に利用する  
   継承されないクラス、オーバーライドされないメソッド、値の変わらない変数（つまり定数）等、変化のないもの/変化させたくないものについては`final` で宣言する。

  良い例：

  ```java
  //継承されないクラス
  public final class CalculateUtils {
      //・・・
  }

  //値の変わらない変数（定数）
  private static final String MESSAGE = "・・・";

  //オーバーライドされないメソッド
  public final int sum(/*変化させたくない値*/final int... values) {
      int sumValue = 0;
      for (/*変化させたくない値*/final int value : values) {
          sumValue += value;
      }
      return sumValue;
  }
  ```

## フォーマット

- インデントは空白文字 4 文字分の Tab を使用する
- 長すぎる行は避ける
- `{` の後にステートメントを記述しない  
   良い例：

  ```java
  if (s == null) {
      return 0;
  }
  ```

  悪い例：

  ```java
  if (s == null) {return 0;}
  ```

- 1 行に 2 つ以上のステートメントを記述しない  
   悪い例：

  ```java
  } catch (Exception e) {
      log.error("Error", e);return null;
  }
  ```

- カンマの後には空白文字を  
   良い例：

  ```java
  process(x, y, z);
  ```

  悪い例：

  ```java
  process(x,y,z);
  ```

- 代入演算子（ `=` , `+=` , `-=` , …）の前後には空白文字を挿入する  
   良い例：

  ```java
  int a = x;
  a += 10;
  ```

  悪い例：

  ```java
  int a=x;
  a+= 10;
  ```

- for 文内のセミコロンの後には空白文字を挿入する  
   良い例：

  ```java
  for (int i = 0; i < array.length; i++) {
      //・・・
  }
  ```

  悪い例：

  ```java
  for (int i = 0;i < array.length ;i++) {
      //・・・
  }
  ```

- `++` や `--` とオペランドの間には空白文字を入れない  
   良い例：

  ```java
  i++;
  ```

  悪い例：

  ```java
  i ++;
  ```

- ビット演算子（ `|` 、 `&` 、 `^` 、 `<<` 、 `>>` ）の前後には空白文字を挿入する
- 論理演算子（ `||` 、`&&`）の前後には空白文字を挿入する
- 関係演算子（ `<` 、 `>` 、 `>=` 、 `<=`、`==`、 `!=` ）の前後には空白文字を挿入する
- 算術演算子（ `＋` 、 `－` 、 `＊` 、 `/` 、 `%` ）の前後には空白文字を挿入する
- return 文ではカッコを使わない  
   良い例：

  ```java
  int answer = (a + b + c) * d;
  return answer;
  ```

  悪い例：

  ```java
  return ((a + b + c) * d);
  ```

- if などの条件式で boolean の変数を比較しない

  良い例：

  ```java
  if (hasStock)
  ```

  悪い例：

  ```java
  if (hasStock == true)
  ```

- 不等号の向きは左向き（ `<` 、 `<=` ）にする  
   良い例：

  ```java
  if (from <= x && x <= to) {
  ```

  悪い例：

  ```java
  if (x >= from && x <= to) {
  ```

## コメント

- ファイルの先頭への Copyright の表記について  
  ソースのファイルヘッダにコピーライト標記は法的拘束力がないため、不要とする。  
  ただし、顧客からの要求があった場合を除く。
- Javadoc コメントには、少なくとも author と version(クラス)、param と return と exception(メソッド)を記述する

  - 今後もバージョンアップのリリースが予定されているソースでは、上記に加えて since（バージョン）を記述する
  - `@Override`のあるメソッドでは、上記に加えて`{@Inherit}`を記述する

- Javadoc 　クラスヘッダコメントのフォーマットは以下の通り

  良い例：

  ```java
  /**
   * Action（or Bean）クラス　メニュー名称
   *
   * @author 姓 名
   * @version バージョン YYYY/MM/DD 説明
   */
  ```

- コメントは必要なものだけを簡潔に  
   悪い例：

  ```java
  /**
   * 文字列に変換
   */
  @Override
  public String toString() {

  /**
   * コピー
   *
   * @return コピーしたインスタンス
   */
  public Entry copy() {
  ```

- 不要なコメントは記載しない
  - コードからすぐわかること・冗長なコメント
  - 名前の説明  
     コメントではなくわかりやすい名前を付ける。
  - 別システムで管理している内容  
     ソースコード管理システム、バグトラッキングシステムで管理している内容はソースコードにコメントで記載する必要はない。
    - コメントアウトされたコード  
       ソースコード管理システムで管理されている

## インポート

- `java.lang`パッケージはインポートしない

  悪い例：

  ```java
  import java.lang.String;//必要のない記述
  ```

- 原則として static インポートしない  
  JUnit の作成やフレームワークとして static インポートが推奨されるような場合は利用してもよい

- 原則としてオンデマンドのインポート宣言(type-import-on-demand declaration)（アスタリスク`*`によるインポート） は行わない

  悪い例：

  ```java
  import java.util.*;
  ```

## コンストラクタ

- public 宣言していないクラスには`public`権限のコンストラクタを作らない  
   良い例：

  ```java
  class Entry {
      //・・・
      Entry(int id) {
          //・・・
      }
  ```

  悪い例：

  ```java
  class Entry {
      //・・・
      public Entry(int id) {
          //・・・
      }
  ```

- インスタンスメンバを持たない（static メンバのみの）クラスは、`private`権限のコンストラクタを作成する

## メソッド

- オーバーライドさせたくないメソッドは`final`を利用する
- 戻り値が配列のメソッドで、戻る配列のサイズが 0 の場合、メソッドを使用するクライアントの余計な null チェックのロジックを回避するため、null ではなく長さゼロの配列を戻すようにする。
  良い例：

  ```java
  public String[] toArray(String s) {
      if (s == null || s.isEmpty()) {
          return ArrayUtils.EMPTY_STRING_ARRAY;
      }
      return new String[] { s };
  }

  public List<String> toList(String s) {
      if (s == null || s.isEmpty()) {
          return Collections.emptyList();
      }
      return List.of(s);
  }
  ```

  悪い例：

  ```java
  public String[] toArray(String s) {
      if (s == null || s.isEmpty()) {
          return null;
      }
      return new String[] { s };
  }

  public List<String> toList(String s) {
      if (s == null || s.isEmpty()) {
          return null;
      }
      return List.of(s);
  }
  ```

- メソッドは 1 つの役割にする

## クラスメソッド

- クラスメソッドを利用するときは、クラス名を使って呼び出す  
   良い例：

  ```java
  int comp = Integer.compare(x, y);
  ```

  悪い例：

  ```java
  Integer a = //
  int comp = a.compare(x, y);
  ```

## 変数全般

- 1 つのステートメントには 1 つの変数宣言  
   良い例：

  ```java
  /** 科目コード */
  private String code;
  /** 科目名 */
  private String name;
  /** 科目略名 */
  private String shortName;
  ```

  悪い例：

  ```java
  private String code, name, shortName;
  ```

- リテラルは使用しない  
   リテラルとは、コード中に、表現が定数として直接現れており、記号やリストで表現することができないものを指す（数値、文字列両方含む　通称マジックナンバー）。コードの可読性・保守性の低下を防ぐために、リテラル定数（`static final` フィールド）を使用すること。  
   例外：`-1`,`0`,`1` 等をカウント値としてループ処理等で使用するような場合

  良い例：

  ```java
  private static final double ONE_MILE_METRE = 1609.344;

  public double mileToMetre(double mi) {
      return mi * ONE_MILE_METRE;
  }
  ```

  悪い例：

  ```java
  public double mileToMetre(double mi) {
      return mi * 1609.344;
  }
  ```

  - リテラル定数の名前はその値の意味を正しく表現したものにする

    悪い例：

    ```java
    private static final int ZERO = 0;
    ```

- 配列宣言は「`型名[]`」にする

  良い例：

  ```java
  private int[] sampleArray = new int[10];
  ```

  悪い例：

  ```java
  private int sampleArray[] = new int[10];
  ```

- できるだけローカル変数を利用する  
   ローカル変数で事足りるものをインスタンス変数として利用するなど、必要のないインスタンス変数を定義すると、パフォーマンスや可読性の低下やの大きな要因となる上、マルチスレッドを意識した際に不整合がおきる可能性があるので、インスタンス変数は必要性を充分に考慮してから使用すること。
- 定数は`final`で宣言する
- ローカル変数とインスタンス変数を使いわける

## 定数

- `public` で宣言するクラス変数とインスタンス変数は、定数のみとし、 `static final` で定義する  
   `final` ではない `static` な定数は作成しない。

  良い例：

  ```java
  public static final String PROTOCOL_HTTP = "http";
  ```

- 定数（ `static` フィールド）に、 `static` ではないメソッドから書き込まない

- 定数は、プリミティブ型もしくは、不変（Immutable）オブジェクトで参照する

  - 不変`List`の生成には`List.of()`を利用する

    良い例：

    ```java
    public static final List<Integer> VALUES = List.of(1, 2, 3, 4, 5);
    ```

    悪い例：

    ```java
    public static final List<Integer> VALUES = Arrays.asList(1, 2, 3, 4, 5);
    ```

  - 不変`Set`の生成には`Set.of()`を利用する

  - 不変`Map`の生成には`Map.of()`を利用する

    良い例：

    ```java
    public static final Map<Integer, String> VALUES_MAP = Map.of(1, "A", 2, "B", 3, "C");
    ```

    悪い例：

    ```java
    public static final Map<Integer, String> VALUES_MAP = new HashMap<>() {
        {
            put(1, "A");
            put(2, "B");
            put(3, "C");
        }
    };
    ```

  - 不変な配列インスタンスは長さ 0 の配列以外は生成不可能なため、外部から参照される（`public`）定数では利用せず、`List`等への置き換えをすること

    良い例：

    ```java
    public static final List<Integer> VALUES = List.of(1, 2, 3, 4, 5);
    ```

    悪い例：

    ```java
    public static final int[] VALUES = { 1, 2, 3, 4, 5 };
    ```

## インスタンス変数

- インスタンス変数は`private`にする

  良い例：

  ```java
  public class Employee {
      private long id;

      //・・・
      //getter/setter
  }
  ```

  悪い例：

  ```java
  public class Employee {
      public long id;

      //・・・
      //getter/setter
  }
  ```

## クラス変数

- `public static final` 宣言した配列を利用しない  
   ※「定数」を参照

- クラス変数にはクラス名を使用してアクセスすること

  良い例：

  ```java
  BigDecimal b = BigDecimal.ZERO;
  ```

  悪い例：

  ```java
  BigDecimal a = //
  BigDecimal b = a.ZERO;
  ```

    <br>

## ローカル変数

- ローカル変数は利用する直前で宣言する  
   行間の程度にもよるが、ある程度まとめて宣言するのは OK とする。

  良い例：

  ```java
  for (int i = 0; i < lines.length; i++) {
      String line = lines[i];
      //lineの処理
  }
  ```

  悪い例：

  ```java
  String line;
  for (int i = 0; i < lines.length; i++) {
      line = lines[i];
      //lineの処理
  }
  ```

- ローカル変数は安易に再利用しない  
   一度宣言したローカル変数を、複数の目的で安易に使いまわさないこと。ローカル変数は、役割ごとに新しいものを宣言して初期化することにより、コードの可読性・保守性の向上、及びコンパイラの最適化の促進をはかる。

## 引数

- メソッド引数への代入は行わない  
   原則として`final`で宣言する。

  良い例：

  ```java
  public void add(final int value) {
      //・・・
  }
  ```

## 継承

- スーパークラスのインスタンス変数をサブクラスでオーバーライドしない  
   スーパークラスと同じ名前のフィールドをサブクラスで宣言しないこと。 同じ名前のフィールドを宣言すると、スーパークラスのフィールドはサブクラスで宣言されたフィールドによって隠ぺいされてしまうので、他の人の混乱を招くことを防ぐため重複する名前は付けないこと。

  悪い例：

  ```java
  public class Abs {
      protected String name;
  }

  public class Sub extends Abs {
      protected String name;//Abs#nameは隠ぺいされる
  }
  ```

- スーパークラスのメソッドをオーバーライドするときは@Override アノテーションを指定する。

  良い例：

  ```java
  public class Abs {
      protected void process() {

      }
  }

  public class Sub extends Abs {
      @Override
      protected void process() {

      }
  }
  ```

  悪い例：

  ```java
  public class Abs {
      protected void process() {

      }
  }

  public class Sub extends Abs {
      //@Overrideアノテーションの指定がない
      protected void process() {

      }
  }
  ```

- スーパークラスで private 宣言されているメソッドと同じ名前のメソッドをサブクラスで定義しない  
   スーパークラスにある private メソッドと同じ名前のメソッドをサブクラスで定義しないこと。private メソッドはオーバーライドされず全く別のメソッドとして扱われ、他の人の混乱を招き、バグにつながる恐れがある。

## インナークラス

- 原則としてインナークラスは利用しない  
   一つの java ファイルに複数のクラスを記載するのは NG とする。また無名クラスを利用するのも原則として NG とする。  
   Enum の定数固有メソッド実装(constant-specific method implementation)、Java8 のラムダ式は内部的にインナークラスとされるがこれらは許可する。

## メンバー順序

- 以下の順で記述する

  1. static フィールド
  2. static イニシャライザー
  3. static メソッド
  4. フィールド
  5. イニシャライザー
  6. コンストラクター
  7. メソッド

- 同一カテゴリー内では以下の可視性の順で記述する

  1. public
  2. protected
  3. パッケージ private
  4. private

## インスタンス

- オブジェクト同士は`equals()`メソッドで比較する

  良い例：

  ```java
  String s1 = "text";
  String s2 = "text";
  if (s1.equals(s2)) {
      //・・・
  }
  ```

  悪い例：

  ```java
  String s1 = "text";
  String s2 = "text";
  if (s1 == s2) {
      //・・・
  }
  ```

  ただし Enum の場合は`==`演算子を利用して比較する

  `equals()`メソッドで比較する際、左辺のオブジェクトが null にならないように制御すること。

- Class 名を利用した比較をおこなわない

  良い例：

  ```java
  if (o instanceof Foo) {
      // ...
  }
  ```

  悪い例：

  ```java
  if ("my.Foo".equals(o.getClass().getName())) {
      // ...
  }
  ```

## 制御構造

- 制御文（ `if` , `else` , `while` , `for` , `do while` ）の `{ }` は省略しない

  良い例：

  ```java
  if (s == null) {
      return;
  }
  ```

  悪い例：

  ```java
  if (s == null)
      return;
  ```

- ステートメントが無い `{}` ブロックを利用しない  
   悪い例：

  ```java
  //{}内の記述が無い
  if (s == null) {
  }
  ```

- `if` / `while` の条件式で `=` は利用しない  
   良い例：

  ```java
  boolean a =//
  if (!a) {
      //・・・
  }
  ```

  悪い例：

  ```java
  boolean a =//
  if (a = false) {//コーディングミス
      //・・・
  }


  boolean a =//
  boolean b =//
  if (a = b) {//おそらくコーディングミス
      //・・・
  }
  ```

- `for` と `while` の使い分けを意識する
- for 文を利用した繰り返し処理中でループ変数の値を変更しない  
   悪い例：

  ```java
  String[] array = { /*・・・*/ };
  for (int i = 0; i < array.length; i++) {
      //・・・
      i += 2;//NG
  }

  for (String s : array) {
      //・・・
      s = "string";//NG
  }
  ```

- for 文のカウンタは特別な事情がない限り、0 から始める
- 配列やリストなどの全要素に対するループ処理は拡張 for 文を使用する。  
   良い例：

  ```java
  for (int value : array) {
      //・・・
  }

  for (String value : list) {
      //・・・
  }
  ```

- 配列をコピーするときは`Arrays.copyOf()`メソッドを利用する

  良い例：

  ```java
  int[] newArray = Arrays.copyOf(array, array.length);
  ```

  悪い例：

  ```java
  int[] newArray = new int[array.length];
  System.arraycopy(array, 0, newArray, 0, array.length);
  ```

- 繰り返し処理中のオブジェクトの生成は最小限にする
- if 文と else 文の繰り返しや switch 文の利用はなるべく避け、オブジェクト指向の手法を利用する  
   良い例：

  ```java
  CodingKind codingKind = toCodingKind(kind);
  d = codingKind.encode(s);

  //---

  CodingKind codingKind = toCodingKind(kind);
  s = codingKind.decode(d);
  ```

  悪い例：

  ```java
  switch (kind) {
  case 1:
      d = encode1(s);
      break;
  case 2:
      d = encode2(s);
      break;
  default:
      break;
  }

  //---

  switch (kind) {
  case 1:
      s = decode1(d);
      break;
  case 2:
      s = decode2(d);
      break;
  default:
      break;
  }
  ```

- 繰り返し処理の内部で `try` ブロックを利用しない  
   特に理由がない場合は繰り返し処理の外に`try`ブロックを記載する。  
   ただし、繰り返し処理内部で例外をキャッチし処理を行いたい場合は繰り返し処理の内部で`try`ブロックを利用してもよい。

  良い例：

  ```java
  for (String s : array) {
      BigDecimal num;
      try {
          num = new BigDecimal(s);
      } catch (NumberFormatException e) {
          num = BigDecimal.ZERO;
      }
      //・・・
  }
  ```

## 文字列操作

- 文字列同士が同じ値かを比較するときは、`equals()`メソッドを利用する  
   良い例：

  ```java
  String s1 = "text";
  String s2 = "text";
  if (s1.equals(s2)) {
      //・・・
  }
  ```

  悪い例：

  ```java
  String s1 = "text";
  String s2 = "text";
  if (s1 == s2) {
      //・・・
  }
  ```

- 文字列リテラルは`new` しない  
   良い例：

  ```java
  String s = "";
  ```

  悪い例：

  ```java
  String s = new String();
  ```

- 更新される文字列には`StringBuilder` クラスを利用する  
   良い例：

  ```java
  StringBuilder builder = new StringBuilder();
  for (String s : array) {
      builder.append(s);
  }
  System.out.println(builder.toString());
  ```

  悪い例：

  ```java
  String string = "";
  for (String s : array) {
      string += s;
  }
  System.out.println(string);
  ```

    <br>
    スレッドセーフ性が保証されていない箇所では`StringBuffer`クラスを利用する

  [※パフォーマンスについても記載しているので参考にしてください](#文字列連結)

- １ステートメントのみで行われる文字列の連結には`+`演算子を利用する

  良い例：

  ```java
  String s = s1 + s2;

  return s1 + s2 + s3 + s4 + s5;
  ```

  悪い例：

  ```java
  String s = new StringBuilder(s1).append(s2).toString();

  return new StringBuilder(s1).append(s2).append(s3).append(s4).append(s5).toString();
  ```

- 更新されない文字列には`String` クラスを利用する
- 文字列リテラルと定数を比較するときは、文字列リテラルの`equals()`メソッドを利用する  
   良い例：

  ```java
  private static final String PROTOCOL_HTTP = "http";

  if (PROTOCOL_HTTP.equals(url.getProtocol())) {

  }
  ```

  悪い例：

  ```java
  private static final String PROTOCOL_HTTP = "http";

  if (url.getProtocol().equals(PROTOCOL_HTTP)) {

  }
  ```

- プリミティブ型と`String` オブジェクトの変換には、変換用のメソッドを利用する  
   良い例：

  ```java
  int i = 1000;
  String s = String.valueOf(i);// "1000"
  s = NumberFormat.getNumberInstance().format(i);// 3桁区切り "1,000"

  boolean b = true;
  s = String.valueOf(b);// true/false
  s = BooleanUtils.toStringOnOff(b);// on/off
  ```

- 文字列の中に、ある文字が含まれているか調べるには、`contains()`メソッドを利用する
- システム依存記号（ `¥n` 、 `¥r` など）は使用しない。  
   悪い例：

  ```java
  String text = Arrays.stream(array)
      .collect(Collectors.joining("\n"));
  ```

## 数値

- 誤差の無い計算をするときは、`BigDecimal` クラスを使う  
   浮動小数点演算は科学技術計算に利用するもので、誤差が発生する。これに対して、クラス「`BigDecimal`」は、文字列で数値の計算を行うので、金額などの正確な計算に適している。`BigDecimal` ではインスタンス生成時に指定された桁数での精度が保証される。
- 数値の比較は精度に気をつける  
   良い例：

  ```java
  BigDecimal a = new BigDecimal("1");
  BigDecimal b = new BigDecimal("1.0");
  if (a.compareTo(b) == 0) {
      System.out.println("一致");
  }
  ```

  悪い例：

  ```java
  BigDecimal a = new BigDecimal("1");
  BigDecimal b = new BigDecimal("1.0");

  if (a.equals(b)) {
      System.out.println("精度が違うためこの分岐には入らない");
  }
  ```

- 低精度なプリミティブ型にキャストしない
- `BigDecimal`を`String`変換する際は`toString()`ではなく`toPlainString()`を利用すること  
   `toString()`を利用した場合、指数表記になることがあります。

## 日付

- 日付の文字列のフォーマットには、`SimpleDateFormat`または`DateTimeFormatter`を使う  
   良い例：

  ```java
  Date date = new Date();
  SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
  String s = dateFormat.format(date);
  ```

## 三項演算子

- 入れ子の三項演算子の利用は禁止  
   可読性が悪くなるので三項演算子を入れ子で行うのは禁止。

## コレクション

- Java2 以降のコレクションクラスを利用する  
   `Vector` クラス、`Hashtable` クラス、`Enumeration` 等は、特にこれらを利用する理由がなければ、インターフェースを統一する目的で、これらの代わりに`List`(`ArrayList` クラス)、`Map`(`HashMap` クラス)、`Iterator` を使用すること。`List` などのインターフェースを利用することで JDK1.2 で整理されたわかりやすいメソッドを利用でき、また、インターフェースの特性から呼び出し元を変更せずに実装クラスを変更することができる。
- 特定の型のオブジェクトだけを受け入れるコレクションクラスを利用する

  良い例：

  ```java
  List<Map<String, String>> list = new ArrayList<>();
  ```

- `List`のソートは`List.sort()`を利用する  
   `List`クラスの要素をソートする際は Java8 で追加された`List.sort()`を利用すること。  
   Java 7 以前で利用されていた`Collections.sort()`は利用しないこと。
- `Collection.forEach()`は利用しない。拡張 for 文の利用を検討する  
   Java8 で追加されたメソッド。  
   拡張 for 文を利用したほうが多くの場合でデバッグに有利であり、可読性においても`forEach`の優位性は少ないため、`forEach`は原則利用しない。拡張 for 文を利用する。  
   具体的には下記のメソッドを利用しないこと。

  - `Collection#forEach`
  - `Set#forEach`
  - `List#forEach`

  ※ `Map#forEach`はこの限りではない

  良い例：

  ```java
  for (String s : List.of("A", "B")) {
      //処理
  }
  ```

  悪い例：

  ```java
  List.of("A", "B").forEach(s -> {
      //処理
  });
  ```

  ただし、メソッド参照で処理できる場合は`forEach`を利用する。  
   （デバッグのデメリットがほとんどなく、他と比較して処理効率が良いため）

  良い例：

  ```java
  List.of("A", "B").forEach(this::process);
  ```

  悪い例：

  ```java
  for (String s : List.of("A", "B")) {
      this.process(s);
  }
  ```

- `Arrays.asList()`は利用せず、`List.of()`を利用する  
   Java9 で追加されたメソッド。  
   配列を`List`に置き換える場合や、単純な固定の`List`を生成する際には`List.of()`を利用する。

  - `Arrays.asList()`と`List.of()`の違い  
     `List.of()`で生成した`List`は、完全に不変（Immutable）な`List`で、  
     `Arrays.asList()`で生成した`List`は、サイズのみ不変で、`set`等による値の操作が可能な`List`です。  
     また、`set`を行った場合、`Arrays.asList()`に与えられた配列インスタンスにも影響します。

## ラムダ式・メソッド参照・コンストラクタ参照

- ラムダ式が利用できる箇所はラムダ式を利用してよい  
  [※パフォーマンスについても記載しているので参考にしてください](#ラムダ式・メソッド参照・コンストラクタ参照-2)
- ただし、メソッド参照・コンストラクタ参照が利用できる場合はメソッド参照・コンストラクタ参照を利用する

  良い例：

  ```java
  String::compareToIgnoreCase
  ```

  悪い例：

  ```java
  (s1, s2) -> s1.compareToIgnoreCase(s2)
  ```

  良い例：

  ```java
  BigDecimal::add
  ```

  悪い例：

  ```java
  (b1, b2) -> b1.add(b2)
  ```

- ラムダ式記述の際、型宣言は省略記法で記述する

  良い例：

  ```java
  (s1, s2) -> s1 + "=" + s2
  ```

  悪い例：

  ```java
  (String s1, String s2) -> s1 + "=" + s2
  ```

- 原則ラムダ式内の行数は 1 行とする  
  複数行で利用したい場合は、`private`メソッドを作成しメソッド参照を利用する

      良い例：

      ```java
      this::getMax

      private int getMax(int i1, int i2) {
          if (i1 > i2) {
              return i1;
          } else {
              return i2;
          }
      }
      ```
      悪い例：

      ```java
      (i1, i2) -> {
          if (i1 > i2) {
              return i1;
          } else {
              return i2;
          }
      }
      ```

- 原則ラムダ式は 1 行記述に限定するので、中カッコ、`return`は必ず省略する

  良い例：

  ```java
  (s1, s2) -> s1 + "=" + s2
  ```

  悪い例：

  ```java
  (s1, s2) -> {
      return s1 + "=" + s2;
  }
  ```

## 実質的 final（effectively final）

- 実質的 final を利用する  
  変数宣言に`final`を記載しなくてよい。

## Stream API

- 利用してよい  
  [※パフォーマンスについても記載しているので参考にしてください](#stream-api-2)
- 並列ストリームは利用しないこと  
   悪い例：

  ```java
  Stream<?> s = list.parallelStream();
  Stream<?> s = list.stream().parallel();
  ```

- StreamAPI 記述の際の改行位置は、各中間処理・末端処理前のピリオドの前で改行する

  良い例：

  ```java
  List<Character> alphabetLower = list.stream()
      .filter(Character::isAlphabetic)
      .map(Character::toLowerCase)
      .collect(Collectors.toList());
  ```

  悪い例：

  ```java
  List<Character> alphabetLower = list.stream().filter(Character::isAlphabetic)
      .map(Character::toLowerCase).collect(Collectors.toList());

  List<Character> alphabetLower = list
      .stream()
      .filter(Character::isAlphabetic)
      .map(Character::toLowerCase)
      .collect(Collectors.toList());
  ```

- インデントは統合開発環境の提供するフォーマッタに合わせる
- 中間処理の数は 3 つ（3 行）程度までを推奨する  
   中間処理の記述が多くなると可読性も悪くなり、デバッグも難しくなるため、3 行程度を目安にロジックを検討すること。
- コメントは、原則として処理中には記載しない  
   難解になってしまった場合のみ処理中の記載を認める

  良い例：

  ```java
  // クラスFooのフィールドStrの値で昇順にソートし、フィールドStrの要素を取得して処理する。
  hogeList.stream()
      .sorted(Comparator.comparing(Foo::getStr))
      .map(Foo::getStr)
      .forEach(this::proc);
  ```

  悪い例：

  ```java
  hogeList.stream()
      .sorted(Comparator.comparing(Foo::getStr)) //クラスFooのフィールドStrの値で昇順にソート
      .map (Foo::getStr) //フィールドStrの要素を取得
      .forEach(this::proc); //処理


  hogeList.stream()
      //クラスFooのフィールドStrの値で昇順にソート
      .sorted(Comparator.comparing(Foo::getStr))
      //フィールドStrの要素を取得
      .map (Foo::getStr)
      //処理
      .forEach(this::proc);
  ```

- Stream は極力変数代入しないこと  
   Stream は中間処理、末端処理を行うと使用済みとなり、以降同じインスタンスは利用できない。  
   変数代入はほとんどの場合意味をなさず、むしろミスの元となるため極力変数代入はしないこと。

  良い例：

  ```java
  List<String> list1 = Stream.of("A", "B", "C")
          .map(String::toLowerCase)
          .collect(Collectors.toList());

  List<String> list2 = Stream.of("A", "B", "C")
          .map(s -> s + s)
          .collect(Collectors.toList());
  ```

  悪い例：

  ```java
  Stream<String> stream = Stream.of("A", "B", "C");
  Stream<String> stream1 = stream.map(String::toLowerCase);
  List<String> list1 = stream1.collect(Collectors.toList());

  Stream<String> stream2 = stream.map(s -> s + s);//コーディングミス streamは使用済のためエラーになる
  List<String> list2 = stream2.collect(Collectors.toList());
  ```

## Optional

- Optional は同メソッド内で値を取り出す場合は極力変数代入しないこと  
   Optional とその値の変数は同じものを示す名前となり、同じ意味の変数名が複数現れることで可読性が下がるため、Optional の変数代入は行わないこととする。

  良い例：

  ```java
  Employee employee = findEmployee(employeeId)
          .orElseThrow(IllegalArgumentException::new);
  ```

  悪い例：

  ```java
  Optional<Employee> employeeOpt = findEmployee(employeeId);
  Employee employee = employeeOpt.orElseThrow(IllegalArgumentException::new);
  ```

    <br>
    直接、値を取り出すことなくOptionalでのみ扱う場合はOptionalを変数代入してもよい。

  良い例：

  ```java
  Optional<Employee> employee = findEmployee(employeeId);

  Dept dept = employee.map(Employee::getDivision)
          .map(Division::getDept)
          .orElse(null);

  Role role = employee.map(Employee::getRole)
          .orElse(null);

  //-----

  Optional<Employee> employee = findEmployee(employeeId);
  //・・・処理
  return employee;
  ```

## var (Local-Variable Type Inference)

次のリンクも参考にしてください。  
[Style Guidelines for Local Variable Type Inference in Java](https://openjdk.java.net/projects/amber/LVTIstyle.html)

- 明確な方針で、利用する・利用しないを統一すること  
   方針無く、`var`を混在させるとソースコードの見通しと保守性が悪くなります。  
   各プロジェクトで、例えば以下ののような方針で統一してください。

  1. `var`を利用しない
  2. 原則`var`を利用する
  3. 右辺で、明確に型がわかる場合は`var`を利用する

  以下で`2`、`3`について例を示します。

  - 原則`var`を利用する

    利用できる箇所は全て`var`を利用します。

    良い例：

    ```java
    var a = "";
    var b = 123;
    var c = new ArrayList<String>();
    ```

    悪い例：

    ```java
    var a = "";
    int b = 123;
    List<String> c = new ArrayList<>();
    ```

    ```java
    void methodA() {
        var a = "";
    }
    void methodB() {
        String a = "";
    }
    ```

  - 右辺で、明確に型がわかる場合は`var`を利用する

    右辺をみて型がわかる場合は、全て`var`を利用します。
    それ以外は`var`を利用してはいけません。

    良い例：

    ```java
    var s = ""; // リテラルによって型が明確に判断できます
    var list1 = new ArrayList<String>(); // newによって型が明確に判断できます
    var list2 = (List<String>) map.get("p"); // キャストによって型が明確に判断できます
    var list3 = List.of("A", "B", "C"); // ファクトリーによって型が明確に判断できます
    ```

    プロジェクトで観点を決めるべき例：

    ```java
    var b1 = s.isEmpty(); // `is`で始まるメソッドは通例としてbooleanを返します
    var b2 = Objects.equals(s1, s2); // `equals`メソッドは通例としてbooleanを返します
    var i1 = Objects.hash(s); // `hash`、`hashCode`メソッドは通例としてintを返します
    var i2 = Objects.compare(s1, s2); // `compare`、`compareTo`メソッドは通例としてintを返します
    ```

    悪い例：

    ```java
    var a = e.getData(); // `e`の型と、メソッド定義がわからなければ型が判断できません
    ```

## ストリーム（InputStream OutputStream）

- ストリームを扱う API を利用するときは、try-with-resources 文で後処理をする

  良い例：

  ```java
  try (InputStream inputStream = Files.newInputStream(Paths.get("foo.txt")) {
      //inputStreamに対する処理を記載
  }
  ```

- `ObjectOutputStream` では`reset()`を利用する

## リソースの解放

- リソース解放を必要とするクラスを利用するときは、try-with-resources 文で後処理をする

  良い例：

  ```java
  try (InputStream inputStream = Files.newInputStream(Paths.get("foo.txt")) {
      //inputStreamに対する処理を記載
  }
  ```

- リソース解放を必要とするクラスを作成する場合は`AutoCloseable`を`implements`する  
   `AutoCloseable`を`implements`することで try-with-resources 文が利用できるようになります。

## 例外

- catch 文で受け取る例外は、詳細な例外クラスで受け取る

  良い例：

  ```java
  try (InputStream inputStream = Files.newInputStream(Paths.get("foo.txt")) {
      //・・・
  } catch (IOException e) {
      log.error("Error", e);
      throw e;
  }
  ```

  悪い例：

  ```java
  try (InputStream inputStream = Files.newInputStream(Paths.get("foo.txt")) {
      //・・・
  } catch (Exception e) {//範囲が広すぎる例外クラスの利用はNG
      log.error("Error", e);
      throw e;
  }
  ```

- `Exception` クラスのオブジェクトを生成してスローしない
- `catch` ブロックでは基本、例外処理をする。ただし処理を書いてはいけない部分もあるので、その部分については、"`// ignore`" というコメントを記述すること。
- 例外クラスは無駄に定義しない

## ガベージコレクション

- 原則`finalize()`のオーバーライド実装は禁止
- もし`finalize()`をオーバーライドした場合は`super.finalize()` を呼び出す
- アプリケーションから`finalize()`を呼び出さない

# コメント規約

## よいコメントの鉄則

- コードを明確化するコメントを書く  
  コードにコメントを書く理由は、自分自身、一緒に仕事をしている人、後に関わる開発者にとってコードをより理解しやすいものにするためである。
- コメント化する価値がないプログラムならば、実行するに値しない  
  有用な格言。コメントは必須。
- 過剰な装飾は使わない （例：見出し状のコメント）  
  1960 年代から 1970 年代の典型的な COBOL プログラマにはアスタリスク( `*` )でコメントを囲った箱を書く習慣があった。彼らの芸術的な主張を表わしているのかもしれないが、率直に言えばそれは製品に加わるちょっとした価値に比べれば大きな時間の無駄である。かわいいコードではなくきれいなコードを書くはずである。さらに、コードを表示するディスプレイや印刷するプリントに使われるフォントはプロポーショナルだったりそうでなかったりして、箱をきれいに整列させることは難しい。
- コメントはシンプルに  
  かつて見たもっとも最良のコメントは、シンプルな要点をまとめた注釈であった。なにも本を書く必要はなく、他の人がコードを理解するに十分な情報を提供するだけでよいのである。
- コードを書く前に先にコメントを記述する  
  コードをコメント化する最良の方法は、コードを書く前にコメントを書くことである。それが、コードを書く前にコードがどのように動作するかについて考えるよい機会となり、コメントの存在を保障することにもつながる。少なくともコードを書いた時にコメントすべきである。コメントによってコードが理解しやすくなることで、コードの開発中にアドバンテージを得ることができる。コードにコメントを書く時間を費やせば、それによって得られるものがある。
- コメントには、なぜそうなのかを書く。コードを読めば分かることを書かない  
   基本的に、コードの一部分を見ればそれが何かを理解することはできる。例えば、以下のコードを見て、$1000 以上の注文については 5%ディスカウントされることは理解できる。なぜそうなのか？大きな注文ではディスカウントがつきものだというビジネスルールがあるのだろうか？大きな注文に時間限定サービスがあるのか、それともずっとサービスがあるのか？これを書いたプログラマの気前がよかったのか？  
   どこかソースコード中か別な文書にコメントされていない限り、それがなぜなのかを知ることはできない。

  ```java
  if (grandTotal >= 1000.00) {
      grandTotal = grandTotal * 0.95;
  }
  ```

  なお、メソッドコメントには、適切な javadoc コメント（タグ）のほかに、以下の内容も可能な限り明記すること。

  - 副作用のある処理の場合は、その内容　（→ メソッドの引数オブジェクトがメソッド内で変更されるケースなど）
  - 既知のバグ　（→ 判明しているが修正しないことにした場合など）
  - 影響のある事前条件、事後条件　（→ メソッドが正しく動作するための前提について）
  - 並行性　（→ 　マルチスレッドでアクセスされた場合の動作について）
  - 該当メソッドの使用例やサンプルコード

- TODO コメント  
   設計者確認待ち、共通処理の作成待ちなどの理由により、実装時に TODO がある場合、下記のようにコメントを記述する。  
   （Eclipse の TODO コメント形式を採用）  
   例）

  ```
  //TODO：ワークフローの仕様決定待ち　関連チケット#12345
  ```

## Java コメント（3 種類）の使い分け

Java では 3 種類のコメントが使える。javadoc コメントは`/**`で開始され、`*/`で終わる。C 風コメントは`/*`で開始され`*/`で終わる。単一行コメントは`//`で開始され、そのソースコード行が終わるまで続く。以下の表ではコメントの使い方とその例を示す。（コメントのスタイルに関しては、前述の「標準規約に準拠したコーディング例」を参照）

| コメント種類                         | 使用方法                                                                                                                                                                                              | 例                                                                                                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| javadoc コメント<br>`/** comment */` | interface、class、メソッド、フィールドの直前に書く。コメントは javadoc によって処理され、外部ドキュメント(HTML)として生成される。（この形式以外のコメントはドキュメントとして出力されないことに注意） | <code class="comment-code">/\*_<br> _ 顧客（Customer）-<br> _ 顧客はわれわれがサービスまたは製品を売った人物<br> _ もしくは組織のいずれかである。<br> _ @author 開発太郎<br> _/</code>           |
| C 風コメント<br>`/* comment */`      | 特定のコードを無効化したいが、後で使用するかもしれないので残しておくためにコメント化する時や、デバッグ時に一時的に無効化するときに使用する。                                                          | <code class="comment-code">/_ <br> このコードは J.T.Kirk によって 1997.12.9 に前述のコードと置き換えたためコメント化した。2 年間不要であるならば削除せよ。<br> ... (ソースコード) <br> _/</code> |
| 単一行コメント<br>`// comment`       | メソッド内にて、ビジネスロジック、コードの概要、一時変数の定義内容などを記述する。                                                                                                                    | <code class="comment-code">// 1995 年 2 月に開始された X 氏の寛大なキャンペーンで<br>// 定められた通り 1000$を超える請求には、全て 5%割引を<br>// 適用する。</code>                              |

※ ロジック中に、頻繁に C 風コメントでコメントを書くとまとめてコメントアウトする場合に不便なため、基本的にロジック中では単一行コメントを利用すること。

# パフォーマンス

パフォーマンスを考慮した Java のコーディングについて以下に示す。

※ パフォーマンスは jre のバージョンやスペックによって変化します。本内容は jre1.8.0_74 での検証結果を元にした内容です。

※ 性能計測結果についての記載がありますが、あくまでも参考値です。性能を保証するものではありません。

<a id="stream-api-2"></a>

## Stream API

Java8 で追加された Stream API での記述は、可読性も高く、簡潔に書けますが、パフォーマンス・性能面で注意が必要な場合があります。

List の処理を行う際、拡張 for 文で処理する場合は Iterator インスタンスが 1 つだけ生成されますが、Stream API で処理する場合、最初の Stream インスタンスに加え、各中間処理ごとにも Stream インスタンスが生成され、その分の性能劣化が懸念されます。  
以下に処理例と計測結果を記載します。

- 拡張 for 文

  ```java
  List<String> list = //数値文字列のList
  List<String> resultList = new ArrayList<>();
  for (String string : list) {
      if (string.endsWith("0")) {
          resultList.add(string);
      }
  }
  return resultList;
  ```

- Stream API

  ```java
  List<String> list = //数値文字列のList
  List<String> resultList = list.stream()
      .filter(s -> s.endsWith("0"))
      .collect(Collectors.toList());
  return resultList;
  ```

- 計測結果

  | 処理する List の件数 | 拡張 for 文 (ms) | StreamAPI (ms) |
  | -------------------: | ---------------: | -------------: |
  |             100 万件 |                7 |              9 |
  |           1,000 万件 |               88 |            114 |
  |               1 億件 |              949 |          1,026 |
  |               2 億件 |            1,822 |          2,081 |

小中規模の処理量であれば考慮するほどの性能差はありませんが、大量の処理が見込まれる場合は考慮が必要です。  
また、Stream API は並列処理（スレッド処理）の機能をサポートしていますので、利用できる場合は並列処理も含めての検証が必要です。

<a id="ラムダ式・メソッド参照・コンストラクタ参照-2"></a>

## ラムダ式・メソッド参照・コンストラクタ参照

Java8 で追加されたラムダ式・メソッド参照・コンストラクタ参照は、匿名クラスを利用するよりも効率的です。  
積極的な利用を推奨します。

以下に Comparator を生成した場合の計測結果を記載します。

- 匿名クラス

  ```java
  Comparator<String> c = new Comparator<String>() {
      @Override
      public int compare(String o1, String o2) {
          return o1.compareToIgnoreCase(o2);
      }
  };
  ```

- ラムダ式

  ```java
  Comparator<String> c = (o1, o2) -> o1.compareToIgnoreCase(o2);
  ```

- メソッド参照

  ```java
  Comparator<String> c = String::compareToIgnoreCase;
  ```

- 計測結果

  | 処理件数 | 匿名クラス (ms) | ラムダ式 (ms) | メソッド参照 (ms) |
  | -------: | --------------: | ------------: | ----------------: |
  |  10 億回 |             380 |   0(計測不能) |       0(計測不能) |
  | 100 億回 |           6,374 |   0(計測不能) |       0(計測不能) |
  |   1 京回 |     (30 秒以上) |            14 |                10 |

ラムダ式は外部の変数を利用する場合、匿名クラスとほぼ同じ動作をします。

- 匿名クラス

  ```java
  new Comparator<String>() {
          @Override
          public int compare(String o1, String o2) {
              return arg.equals("DESC") ? o2.compareToIgnoreCase(o1)
                                              : o1.compareToIgnoreCase(o2);
          }
      }
  ```

- ラムダ式

  ```java
  Comparator<String> c = (o1, o2) -> arg.equals("DESC") ? o2.compareToIgnoreCase(o1)
                                      : o1.compareToIgnoreCase(o2);
  ```

- 計測結果

  |                   処理件数 | 匿名クラス (ms) | ラムダ式 (ms) |
  | -------------------------: | --------------: | ------------: |
  |  10 億回（パラメータあり） |             571 |           572 |
  | 100 億回（パラメータあり） |           9,900 |         9,864 |

## 文字列連結

### 文字列連結（繰り返し）

文字列連結を繰り返し処理中で行う際、`+`演算子で処理することはアンチパターンとして知られています。  
繰り返し処理中の文字列連結は、 `StringBuilder`、 `StringJoiner`、 `StringBuffer` を利用します。  
また、コレクション要素の結合であれば`String#join`が利用できます。

以下に処理例と計測結果を記載します。

- `+`演算子

  ```java
  String s = "";
  for (int i = 0; i < list.size(); i++) {
      String string = list.get(i);
      if (i > 0) {
          s += ",";
      }
      s += string;
  }
  return s;
  ```

- StringBuilder

  ```java
  StringBuilder sb = new StringBuilder();
  for (int i = 0; i < list.size(); i++) {
      String string = list.get(i);
      if (i > 0) {
          sb.append(",");
      }
      sb.append(string);
  }
  return sb.toString();
  ```

- StringBuffer

  ```java
  StringBuffer sb = new StringBuffer();
  for (int i = 0; i < list.size(); i++) {
      String string = list.get(i);
      if (i > 0) {
          sb.append(",");
      }
      sb.append(string);
  }
  return sb.toString();
  ```

- String#join

  ```java
  return String.join(",", list);
  ```

- 計測結果

  | 処理する List の件数 | `+`演算子 (ms) | StringBuilder (ms) | StringBuffer (ms) | String#join (ms) |
  | -------------------: | -------------: | -----------------: | ----------------: | ---------------: |
  |             1,000 件 |              5 |        0(計測不能) |       0(計測不能) |      0(計測不能) |
  |               1 万件 |          1,016 |                  1 |                 1 |                1 |
  |              10 万件 |    (30 秒以上) |                  2 |                 5 |                5 |
  |             100 万件 |    (30 秒以上) |                 29 |                42 |               51 |

### 文字列連結（定数）

基本的に処理中の文字列連結では`+`演算子は使わないで処理するほうがパフォーマンスが高くなりますが、定数の場合は`+`演算子で定義するほうがパフォーマンスが高いです。

たとえば以下のように、処理したい場合、

```java
private static final String CONST_A = "A";
private static final String CONST_B = "B";
private static final String CONST_AB = CONST_A + CONST_B;
```

StringBuilder で処理しようとすると以下のようになります。

```java
private static final String CONST_AB = new StringBuilder(CONST_A).append(CONST_B).toString();
```

しかし、これらをバイトコード上で確認するとそれぞれ以下のようになります。

- `+`演算子

  ```java
  private static final java.lang.String CONST_AB = "AB";
  ```

- StringBuilder

  ```java
  private static final java.lang.String CONST_AB;

  static {};
     0  new java.lang.StringBuilder [20]
     3  dup
     4  ldc <String "A"> [8]
     6  invokespecial java.lang.StringBuilder(java.lang.String) [22]
     9  ldc <String "B"> [11]
    11  invokevirtual java.lang.StringBuilder.append(java.lang.String) : java.lang.StringBuilder [26]
    14  invokevirtual java.lang.StringBuilder.toString() : java.lang.String [30]
    17  putstatic jp.co.packagename.ClassName.CONST_AB : java.lang.String [34]
    20  return
  ```

`+`演算子を利用した場合コンパイル時に最適化され、文字列`"A"`と`"B"`をあらかじめ結合して class が作成されます。  
`StringBuilder`を利用した場合は最適化はされず、記述した通りの処理が行われます。

計測した場合、下記のようになります。

- 計測結果

  |   処理回数 | StringBuilder (ms) | `+`演算子 (ms) |
  | ---------: | -----------------: | -------------: |
  | 5,000 万回 |                559 |    0(計測不能) |
  |     1 億回 |              1,059 |    0(計測不能) |

通常、定数処理を大量に処理することは考えられないので性能問題になることはありませんが、`+`演算子を利用したほうがパフォーマンスが高いこともあるということを理解してください。

## List の種類

`List`には`ArrayList`のような`RandomAccess`を implements した、ランダムアクセスをサポートしているクラスと、  
`LinkedList`のようなランダムアクセスをサポートしていない（シーケンシャルアクセス）クラスが存在します。  
`RandomAccess`ではない`List`は、`List#get`などインデックスを利用するような操作のパフォーマンスが低いので注意してください。

以下に処理例と計測結果を記載します。

- for 文(List#get(int)によるループ)

  ```java
  int size = list.size();
  for (int i = 0; i < size; i++) {
      String s = list.get(i);
      //処理
  }
  ```

- 拡張 for 文

  ```java
  for (String s : list) {
      //処理
  }
  ```

- forEach

  ```java
  list.forEach(this::処理);
  ```

- 計測結果

  | 処理する List の件数 | `ArrayList`<br>for 文(List#get(int)によるループ) (ms) | `LinkedList`<br>for 文(List#get(int)によるループ) (ms) | `ArrayList`<br>拡張 for 文 (ms) | `LinkedList`<br>拡張 for 文 (ms) | `ArrayList`<br>forEach (ms) | `LinkedList`<br>forEach (ms) |
  | -------------------- | ----------------------------------------------------: | -----------------------------------------------------: | ------------------------------: | -------------------------------: | --------------------------: | ---------------------------: |
  | 1 万件               |                                           0(計測不能) |                                                     73 |                     0(計測不能) |                      0(計測不能) |                 0(計測不能) |                  0(計測不能) |
  | 10 万件              |                                           0(計測不能) |                                                  7,576 |                     0(計測不能) |                      0(計測不能) |                           1 |                            2 |
  | 20 万件              |                                           0(計測不能) |                                                 17,740 |                     0(計測不能) |                      0(計測不能) |                 0(計測不能) |                  0(計測不能) |
  | 50 万件              |                                           0(計測不能) |                                            (30 秒以上) |                     0(計測不能) |                                2 |                 0(計測不能) |                            2 |
  | 100 万件             |                                                     1 |                                            (30 秒以上) |                     0(計測不能) |                                4 |                 0(計測不能) |                            4 |
  | 1,000 万件           |                                                    16 |                                            (30 秒以上) |                               8 |                               45 |                           6 |                           44 |

ランダムアクセスをサポートしている`List`がシーケンシャルアクセス（iterator を利用した処理など）で遅いということはないので、  
ループの処理は拡張 for 文等、Iterator によるループで記述するのが無難です。  
`List#get`での処理をすべて禁止することはできませんが、高いパフォーマンスが求められる場合は`List`の種類にも注目してみてください。

## String から Integer・Long への変換

数値文字列の`String`を`Integer`に変換するには、`Integer#valueOf(String)`を利用して下記のように記述します。

```java
String s = "1";
Integer value = Integer.valueOf(s);
```

しかし、下記のようにも記述できます。

```java
String s = "1";
Integer value = new Integer(s);
```

これらの違いは、  
`new Integer(s)`とした場合、必ず Integer インスタンスが生成されますが、  
`Integer.valueOf(s)`とした場合は -128 から 127 の間の数値であればキャッシュから取り出すためインスタンスを生成しません。

このため、前者の`Integer#valueOf(String)`を利用した記述のほうが効率的です。  
`Long#valueOf(String)`も同様です。

性能差が少ないため、ほとんど問題にはなりませんが、FindBugs 等、静的解析で検出される問題のため、理解が必要です。

また、String からの変換だけでなく、int や long からの変換も`#valueOf`が効率的ですが、オートボクシングを利用した場合、コンパイルで自動的にこれらの処理に変換されるため、記述することはありません。

## String から int・long への変換

数値文字列の`String`を`int`に変換するには、`Integer#parseInt(String)`を利用して下記のように記述します。

```java
String s = "1";
int value = Integer.parseInt(s);
```

しかし、オートボクシングが利用できるため、意図せず下記のように記述ミスをする場合があります。

```java
String s = "1";
int value = Integer.valueOf(s);//取得したIntegerインスタンスをオートボクシングでintにcastしている
```

```java
String s = "1";
int value = new Integer(s);//生成したIntegerインスタンスをオートボクシングでintにcastしている
```

「オートボクシング」の説明に記載した通り、性能に差が出るだけでなく、  
記述から明らかにミスであることが解るため、FindBugs 等、静的解析で検出されるコードです。

`long`への変換の場合は`Long#parseLong(String)`を利用します

以下に計測結果を記載します。

- 計測結果

  |   処理回数 | Integer.valueOf(String) (ms) | Integer#parseInt(String) (ms) |
  | ---------: | ---------------------------: | ----------------------------: |
  | 1,000 万回 |                          396 |                           318 |
  |     1 億回 |                        4,060 |                         3,077 |

## BigDecimal の ZERO との比較

BigDecimal の正・負・ZERO の判定は`BigDecimal#signum`を利用します。  
`compareTo`を利用して`BigDecimal.ZERO`と比較しても同じことができますが、`signum`を利用したほうが効率的です。

以下に処理例と計測結果を記載します。

- compareTo 利用

  ```java
  BigDecimal value = new BigDecimal("0.0");
  if (value.compareTo(BigDecimal.ZERO) == 0) {
  ```

- signum 利用

  ```java
  BigDecimal value = new BigDecimal("0.0");
  if (value.signum() == 0) {
  ```

- 計測結果

  （単位：マイクロ秒）

  | 処理回数 | compareTo 利用 (マイクロ秒) |   signum 利用 (マイクロ秒) |
  | -------: | --------------------------: | -------------------------: |
  |   1 京回 |  527<br>max:26,367<br>min:0 | 424<br>max:21,213<br>min:0 |

性能差が少ないので、必ずしも signum を利用する必要はありませんが、大量に処理する場合など、高いパフォーマンスが求められる場合は意識してください。

---

# License

[![CC-By-4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/deed.ja)
