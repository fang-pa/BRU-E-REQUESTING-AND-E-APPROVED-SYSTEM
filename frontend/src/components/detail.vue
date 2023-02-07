<template>
  <div class="container-center">
    <!-- ขอแก้ I -->
    <div v-if="req.titleID == 'I'" class="page" ref="PdfFormI">
      <div class="subpage">
        <p class="text-right font-bold text-3xl">ทบ.10 ม.รภ.บุรีรัมย์</p>
        <p class="text-center font-bold text-3xl">
          มหาวิทยาลัยราชภัฏบุรีรัมย์<br />คำร้องขอแก้ระดับคะนน “I”
        </p>
        <br />
        <p class="text-right text-2xl">
          วันที่ {{ format_date(req.dateTime) }}
        </p>
        <br />
        <p class="text-left font-bold text-2xl">
          เรื่อง ขอแก้ระดับคะแนน “I”<br />เรียน
          ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน
        </p>
        <br />
        <table
          class="table-auto w-full border-2 border-black text-xl text-center"
        >
          <tbody>
            <tr>
              <td>
                <p class="my-2">
                  ข้าพเจ้า {{ req.studentInfo.nameTitle
                  }}{{ req.studentInfo.name }}
                  {{ req.studentInfo.surName }} รหัสประจำตัว
                  {{ req.studentInfo.userID }} รุ่นที่
                  {{ req.studentInfo.classOf }} เบอร์โทรศัพท์
                  {{ req.studentInfo.phoneNum }}
                  <br />
                  ระดับการศึกษา {{ req.studentInfo.eucationLevel }} สาขาวิชา
                  {{ req.studentInfo.major.majorName }} ชั้นปี
                  {{ req.requireInfo.gradeYear}} หมู่
                  {{ req.studentInfo.group }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-left text-xl">
          &emsp;&emsp;&emsp;มีความประสงค์ขอแก้ระดับคะแนน “I” รหัสวิชา
          {{ req.requireInfo.sub_teach[0].subject.SubJID }} ชื่อวิชา
          {{ req.requireInfo.sub_teach[0].subject.SubJName }}
          ชื่ออาจารย์ผู้สอน {{ req.requireInfo.sub_teach[0].teacher.name }}
          {{ req.requireInfo.sub_teach[0].teacher.surName }}
          เมื่อภาคการศึกษาที่ {{ req.requireInfo.term }} สาเหตุที่ติด “I”
          เนื่องจาก {{ req.requireInfo.because }} <br />
          &emsp;&emsp;&emsp;จึงเรียนมาเพื่อโปรดพิจารณา
        </p>
        <br />
        <p class="text-right text-xl">
          ขอแสดงความนับถือ <br />
          ลงชื่อ {{ req.studentInfo.name }}
          {{ req.studentInfo.surName }} (นักศึกษา)
        </p>
        <br />
        <table class="w-full border-2 border-black text-xl">
          <thead>
            <tr>
              <td colspan="2" class="font-bold px-2 py-2">
                1.ความเห็นอาจารย์ผู้สอน
              </td>
              <td class="font-bold px-2 py-2">
                2.ความเห็นผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colspan="2"
                class="text-center font-bold text-center px-2 py-2"
              >
                {{ req.requireInfo.sub_teach[0].tStatus.Comment }}
              </td>
              <td
                v-show="req.reqStatus.sign.Approved != 'unknown'"
                class="text-center font-bold px-2 py-2"
              >
                {{
                  req.reqStatus.sign.Approved == "yes"
                    ? "อนุมัติ"
                    : "ไม่อนุมัติ"
                }}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center px-2 py-2">
                ลงชื่อ
                <img
                  v-if="req.requireInfo.sub_teach[0].tStatus.tsign != null"
                  :src="req.requireInfo.sub_teach[0].tStatus.tsign.sign"
                  style="width: 80px; margin-top: -25px"
                  class="inline"
                />
                ({{
                  format_date(req.requireInfo.sub_teach[0].tStatus.dateTime)
                }})
              </td>
              <td class="text-center px-2 py-2">
                ลงชื่อ
                <img
                  v-if="req.reqStatus.sign.sign != null"
                  :src="req.reqStatus.sign.sign.sign"
                  style="width: 80px; margin-top: -20px"
                  class="inline"
                />
                ({{ format_date(req.reqStatus.sign.dateTime) }})
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center px-2 py-2"></td>
              <td class="text-center px-2 py-2">
                ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน<br />ปฏิบัติราชการแทน
                รักษาราชการแทนอธิการบดีมหาวิทยาลัยราชภัฏบุรีรัมย์
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-left text-xl">บัดนี้ผลการพิจารณา</p>
        <p
          v-show="req.reqStatus.regis.Approved != 'unknown'"
          class="text-center font-bold text-xl"
        >
          {{ req.reqStatus.regis.Approved == "yes" ? "อนุมัติ" : "ไม่อนุมัติ" }}
        </p>
        <br />
        <br />
        <p class="text-center font-bold text-xl">
          นายทะเบียน
          <img
            v-if="req.reqStatus.regis.sign != null"
            :src="req.reqStatus.regis.sign.sign"
            class="inline"
            style="width: 80px; margin-top: -30px"
          />
          ({{ format_date(req.reqStatus.regis.dateTime) }})
        </p>
      </div>
    </div>

    <!-- ขอถอนรายวิชา -->
    <div v-else-if="req.titleID == 'W'" class="page" ref="PdfFormW">
      <div class="subpage">
        <p class="text-right font-bold text-3xl">ทบ.6 ม.รภ.บุรีรัมย์</p>
        <p class="text-center font-bold text-3xl">
          มหาวิทยาลัยราชภัฏบุรีรัมย์<br />คำร้องขอถอนวิชาเรียน
        </p>
        <br />
        <p class="text-right text-2xl">
          วันที่ {{ format_date(req.dateTime) }}
        </p>
        <br />
        <p class="text-left font-bold text-2xl">
          เรื่อง ขอถอนวิชาเรียน<br />เรียน อธิการบดีมหาวิทยาลัยราชภัฏบุรีรัมย์
        </p>
        <br />
        <table
          class="table-auto border-2 border-black text-xl text-center w-full"
        >
          <tbody>
            <tr>
              <td>
                <p class="my-2">
                  ข้าพเจ้า {{ req.studentInfo.nameTitle
                  }}{{ req.studentInfo.name }}
                  {{ req.studentInfo.surName }} รหัสประจำตัว
                  {{ req.studentInfo.userID }} รุ่นที่
                  {{ req.studentInfo.classOf }} เบอร์โทรศัพท์
                  {{ req.studentInfo.phoneNum }}
                  <br />
                  ระดับการศึกษา {{ req.studentInfo.eucationLevel }} สาขาวิชา
                  {{ req.studentInfo.major.majorName }} ชั้นปี
                  {{  req.requireInfo.gradeYear }} หมู่
                  {{ req.studentInfo.group }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-left text-xl">มีความประสงค์ขอถอนวิชาเรียน ดังนี้</p>
        <br />
        <table class="w-full border-2 border-black text-xl text-center">
          <thead>
            <tr>
              <th class="border border-slate-600">
                <p class="mb-2">รหัสวิชา</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">Section</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">หน่วยกิต/ชั่วโมง</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">ชื่อวิชา</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">ชื่ออาจารย์ผู้สอน</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">ลายเซ็น</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(SubTeach, index) in req.requireInfo.sub_teach"
              :key="index"
            >
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubJID }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubJSec }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubCredit }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubJName }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.teacher.name }} {{ SubTeach.teacher.surName }}
                </p>
              </td>
              <td
                v-if="
                  SubTeach.tStatus.Approved == 'yes' ||
                  SubTeach.tStatus.Approved == 'unknown'
                "
                class="border border-slate-700"
              >
                <p class="mb-2">
                  <img
                    v-if="SubTeach.tStatus.tsign != null"
                    :src="SubTeach.tStatus.tsign.sign"
                    style="width: 80px"
                    class="inline"
                  />
                </p>
              </td>
              <td
                v-else-if="SubTeach.tStatus.Approved != 'unknown'"
                class="border border-slate-700"
              >
                <p class="mb-2">
                  {{ SubTeach.tStatus.Approved == "no" ? "ไม่อนุมัติ" : "" }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-left text-xl">
          รวมหน่วยกิตที่ขอถอนวิชาเรียน จำนวน
          {{ req.requireInfo.totalCredit }} หน่วยกิต <br />
          เหตุผลที่ขอถอนวิชาเรียน {{ req.requireInfo.because }}
          <br />
          &emsp;&emsp;&emsp;จึงเรียนมาเพื่อโปรดพิจารณา
        </p>
        <br />
        <p class="text-right text-xl">
          ขอแสดงความนับถือ <br />
          ลงชื่อ {{ req.studentInfo.name }}
          {{ req.studentInfo.surName }} (นักศึกษา)
        </p>
        <br />
        <table class="w-full border-2 border-black text-xl">
          <thead>
            <tr>
              <td colspan="2" class="font-bold px-2 py-2">1.คำสั่ง</td>
              <td class="font-bold px-2 py-2">2.สำนักงานทะเบียนและประมวลผล</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-show="req.reqStatus.sign.Approved != 'unknown'"
                colspan="2"
                class="text-center font-bold text-center px-2 py-2"
              >
                {{
                  req.reqStatus.sign.Approved == "yes"
                    ? "อนุมัติ"
                    : "ไม่อนุมัติ"
                }}
              </td>
              <td
                v-show="req.reqStatus.office.Approved != 'unknown'"
                class="text-center font-bold px-2 py-2"
              >
                {{
                  req.reqStatus.office.Approved == "yes"
                    ? "ได้ดำเนินการแล้ว"
                    : ""
                }}
              </td>
              <td
                v-if="req.reqStatus.office.Approved == 'no'"
                class="text-center font-bold px-2 py-2"
              >
                อื่นๆ {{ req.reqStatus.office.Comment }}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center px-2 py-2">
                ลงชื่อ
                <img
                  v-if="req.reqStatus.sign.sign != null"
                  :src="req.reqStatus.sign.sign.sign"
                  style="width: 80px; margin-top: -20px"
                  class="inline"
                />
                ({{ format_date(req.reqStatus.sign.dateTime) }})
              </td>
              <td colspan="2" class="text-center px-2 py-2">
                ลงชื่อ
                <img
                  v-if="req.reqStatus.office.sign != null"
                  :src="req.reqStatus.office.sign.sign"
                  style="width: 80px; margin-top: -10px"
                  class="inline"
                />({{ format_date(req.reqStatus.office.dateTime) }})
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center px-2 py-2">
                ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน<br />ปฏิบัติราชการแทน
                รักษาราชการแทนอธิการบดีมหาวิทยาลัยราชภัฏบุรีรัมย์
              </td>
              <td class="text-center px-2 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ขอแก้ F -->
    <div v-else-if="req.titleID == 'A'" class="page" ref="PdfFormA">
      <div class="subpage">
        <p class="text-right font-bold text-3xl">ทบ.5 ม.รภ.บุรีรัมย์</p>
        <p class="text-center font-bold text-3xl">มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
        <p class="text-center font-bold text-2xl">
          วันที่ {{ format_date(req.dateTime) }}
        </p>
        <br />
        <p class="text-left font-bold text-2xl">
          เรื่อง {{ req.title }}&emsp;&emsp;&emsp;&emsp;ภาคการศึกษาที่
          {{ req.requireInfo.term }}<br />เรียน
          ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน
        </p>
        <br />
        <table
          class="table-auto border-2 border-black text-xl text-center w-full"
        >
          <tbody>
            <tr>
              <td>
                <p class="my-2">
                  ข้าพเจ้า {{ req.studentInfo.nameTitle
                  }}{{ req.studentInfo.name }}
                  {{ req.studentInfo.surName }} รหัสประจำตัว
                  {{ req.studentInfo.userID }} รุ่นที่
                  {{ req.studentInfo.classOf }} เบอร์โทรศัพท์
                  {{ req.studentInfo.phoneNum }}
                  <br />
                  ระดับการศึกษา {{ req.studentInfo.eucationLevel }} สาขาวิชา
                  {{ req.studentInfo.major.majorName }} ชั้นปี
                  {{ req.requireInfo.gradeYear }} หมู่
                  {{ req.studentInfo.group }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-xl">
          &emsp;&emsp;&emsp;&emsp;มีความประสงค์ {{ req.title }} เหตุผล
        </p>
        <table class="w-full border-2 border-black text-xl text-center">
          <thead>
            <tr>
              <th class="border border-slate-600">
                <p class="mb-2">รหัสวิชา</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">Sec</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">หน่วยกิต</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">ชื่อวิชา</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">ชื่ออาจารย์ผู้สอน</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">ลายเซ็น</p>
              </th>
              <th class="border border-slate-600">
                <p class="mb-2">
                  วัน/เวลาเรียน <br />
                  เรียนกับสาขา/รุ่น/หมู่
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(SubTeach, index) in req.requireInfo.sub_teach"
              :key="index"
            >
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubJID }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubJSec }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubCredit }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.subject.SubJName }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ SubTeach.teacher.name }} {{ SubTeach.teacher.surName }}
                </p>
              </td>
              <td
                v-if="
                  SubTeach.tStatus.Approved == 'yes' ||
                  SubTeach.tStatus.Approved == 'unknown'
                "
                class="border border-slate-700"
              >
                <p class="mb-2">
                  <img
                    v-if="SubTeach.tStatus.tsign != null"
                    :src="SubTeach.tStatus.tsign.sign"
                    style="width: 80px"
                    class="inline"
                  />
                </p>
              </td>
              <td
                v-else-if="SubTeach.tStatus.Approved != 'unknown'"
                class="border border-slate-700"
              >
                <p class="mb-2">
                  {{ SubTeach.tStatus.Approved == "no" ? "ไม่อนุมัติ" : "" }}
                </p>
              </td>
              <td class="border border-slate-700">
                <p class="mb-2">
                  {{ nameDateTH(SubTeach.subject.NameDate) }}
                  {{ SubTeach.subject.StartH }} /{{ SubTeach.subject.EndH }}
                  <br />
                  {{ SubTeach.course.major.majorName }} / {{ SubTeach.course.classOf }} /
                  {{ SubTeach.course.group }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-left text-xl">
          &emsp;&emsp;&emsp;จึงเรียนมาเพื่อโปรดพิจารณา
        </p>
        <p class="text-right text-xl">
          ขอแสดงความนับถือ <br />
          ลงชื่อ {{ req.studentInfo.name }}
          {{ req.studentInfo.surName }} (นักศึกษา)
        </p>
        <table class="w-full border-2 border-black text-xl">
          <tr>
            <td colspan="2" class="font-bold">1.งานหลักสูตรและแผนการเรียน</td>
            <td class="font-bold">2.สำนักส่งเสริมวิชาการและงานทะเบียน</td>
          </tr>
          <tr>
            <td
              v-show="req.reqStatus.office.C_Approved == 'unknown'"
              colspan="2"
              class="text-center font-bold"
            ></td>
            <td
              v-show="req.reqStatus.office.C_Approved != 'unknown'"
              colspan="2"
              class="text-center font-bold"
            >
              {{
                req.reqStatus.office.C_Approved == "yes" ? "ผ่าน" : "ไม่ผ่าน"
              }}
            </td>
            <td
              v-show="req.reqStatus.sign.Approved != 'unknown'"
              class="font-bold text-center"
            >
              {{
                req.reqStatus.sign.Approved == "yes" ? "อนุมัติ" : "ไม่อนุมัติ"
              }}
            </td>
          </tr>
          <tr>
            <td
              v-show="req.reqStatus.office.C_Approved == 'unknown'"
              colspan="2"
              class="text-center font-bold"
            ></td>
            <td
              v-show="
                req.reqStatus.office.C_Approved == 'no' ||
                req.reqStatus.office.C_Approved != 'unknown'
              "
              colspan="2"
              class="text-center"
            >
              {{ req.reqStatus.office.C_Comment }}
            </td>
            <td class="text-center">
              ลงชื่อ
              <img
                v-if="req.reqStatus.sign.sign != null"
                :src="req.reqStatus.sign.sign.sign"
                style="width: 80px; margin-top: -20px"
                class="inline"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2" class="text-center">
              ลงชื่อ
              <img
                v-if="req.reqStatus.office.C_sign != null"
                :src="req.reqStatus.office.C_sign.sign"
                style="width: 80px; margin-top: -20px"
                class="inline"
              />
              (เจ้าหน้าที่)
            </td>
            <td class="text-center">
              ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน<br />ปฏิบัติราชการแทน
              รักษาราชการแทนอธิการบดีมหาวิทยาลัยราชภัฏบุรีรัมย์
            </td>
          </tr>
          <tr>
            <td colspan="2" class="text-center">
              ({{ format_date(req.reqStatus.office.C_dateTime) }})
            </td>
            <td class="text-center">
              ({{ format_date(req.reqStatus.sign.dateTime) }})
            </td>
          </tr>
          <tr>
            <td
              colspan="3"
              class="font-bold"
              style="border-top: 2px solid black"
            >
              3.สำนักงานทะเบียนและประมวลผล
            </td>
          </tr>
          <tr>
            <td
              v-show="req.reqStatus.office.Approved == 'unknown'"
              colspan="3"
              class="text-center font-bold"
            ></td>
            <td
              v-show="req.reqStatus.office.Approved == 'yes'"
              colspan="3"
              class="text-center font-bold"
            >
              {{
                req.reqStatus.office.Approved == "yes" ? "ได้ดำเนินการแล้ว" : ""
              }}
            </td>
            <td
              v-show="req.reqStatus.office.Approved == 'no'"
              colspan="3"
              class="text-center font-bold"
            >
              {{ req.reqStatus.office.Approved == "no" ? "อื่นๆ" : "" }}
              {{ req.reqStatus.office.C_Comment }}
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-center">
              ลงชื่อ
              <img
                v-if="req.reqStatus.office.sign != null"
                :src="req.reqStatus.office.sign.sign"
                style="width: 80px; margin-top: -20px"
                class="inline"
              />
              (เจ้าหน้าที่)
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-center">
              ({{ format_date(req.reqStatus.office.dateTime) }})
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <div class="container-center mx-96 my-10">
    <div class="flex">
      <div class="grid flex-grow card rounded-box place-items-center">
        <button
          v-if="req.titleID == 'I'"
          class="btn btn-warning rounded-full"
          @click.prevent="generateReportI"
        >
          Download PDF
        </button>
        <button
          v-if="req.titleID == 'W'"
          class="btn btn-warning rounded-full"
          @click.prevent="generateReportW"
        >
          Download PDF
        </button>
        <button
          v-if="req.titleID == 'A'"
          class="btn btn-warning rounded-full"
          @click.prevent="generateReportA"
        >
          Download PDF
        </button>
      </div>
      <div
        v-if="this.$route.params.show == 'true'"
        class="grid flex-grow card rounded-box place-items-center"
      >
        <form @submit.prevent="decide(req._id)">
          <div
            v-if="
              (user.role == 'Teacher' && req.titleID == 'I') ||
              (user.role == 'Officer' && req.titleID == 'W') ||
              ((user.role == 'Officer' || user.role == 'Registrar') &&
                req.titleID == 'A')
            "
            class=""
          >
            <lael
            v-if="user.role == 'Teacher' && req.titleID == 'I'"
              class="input-group input-group-vertical mb-6"
              data-theme="cupcake"
            >
              <span>ความเห็น</span>
              <label class="label cursor-pointer">
                <input
                  v-model="updateStatus.comment"
                  :value="'เห็นสมควรให้แก้'"
                  type="radio"
                  name="cause"
                  class="radio checked:bg-primary"
                />
                <span class="label-text text-xl">เห็นสมควรให้แก้</span>
              </label>
              <label class="label cursor-pointer">
                <input
                  v-model="updateStatus.comment"
                  :value="'ไม่เห็นสมควรให้แก้'"
                  type="radio"
                  name="cause"
                  class="radio checked:bg-secondary"
                />
                <span class="label-text text-xl">ไม่เห็นสมควรให้แก้</span>
              </label>
            </lael>
            <input
              v-model="updateStatus.comment"
              type="text"
              class="
                input input-bordered
                border-black
                rounded-full
                bg-white
                text-black
              "
              placeholder="อื่นๆ"
            />
          </div>
          <div
            v-if="user.role != 'Admin' && user.role != 'Student'"
            class="btn-group mt-6"
          >
            <input
              v-model="updateStatus.status"
              :value="'no'"
              type="radio"
              name="options"
              data-title="ไม่อนุมัติ"
              class="btn bg-red-600"
              data-theme="light"
            />
            <input
              v-model="updateStatus.status"
              :value="'yes'"
              type="radio"
              name="options"
              data-title="อนุมัติ"
              class="btn btn-info"
              data-theme="light"
            />
          </div>
          <div>
            <button
              v-if="user.role != 'Admin' && user.role != 'Student'"
              type="submit"
              class="btn btn-success bg-green-600 my-5"
            >
              บันทึกผลการพิจารณา
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import html2pdf from "html2pdf.js";

export default {
  name: "DeTails",
  data() {
    return {
      user: {},
      req: {},
      updateStatus: {},
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    axios.get("/auth").then((res) => {
      this.user = res.data;
    });
    if (this.$route.params.id) {
      axios.get("/form/req_detail/" + this.$route.params.id).then((res) => {
        this.req = res.data;
      });
    } else {
      this.$router.push("/home");
    }
  },
  methods: {
    format_date(date) {
      if (date) {
        return moment(String(date)).locale("th").add(543, "years").format("LL");
      }
    },
    nameDateTH(name) {
      const dayNames = [
        "sunday",
        "อาทิตย์",
        "monday",
        "จันทร์",
        "tuesday",
        "อังคาร",
        "wednesday",
        "พุธ",
        "thursday",
        "พฤหัสบดี",
        "friday",
        "ศุกร์",
        "saturday",
        "เสาร์",
      ];
      for (let i = 0; i < dayNames.length; i++) {
        if (dayNames[i] == name) {
          return dayNames[++i];
        }
      }
    },
    generateReportI() {
      html2pdf(this.$refs.PdfFormI, {
        filename: this.req._id + ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "p" },
      }).outputPdf("dataurlnewwindow");
    },
    generateReportW() {
      html2pdf(this.$refs.PdfFormW, {
        filename: this.req._id + ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "p" },
      }).outputPdf("dataurlnewwindow");
    },
    generateReportA() {
      html2pdf(this.$refs.PdfFormA, {
        filename: this.req._id + ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "p" },
      }).outputPdf("dataurlnewwindow");
    },
    async decide(id) {
      this.updateStatus.titleID = await this.req.titleID;
      const res = await axios.put("/form/req_decide/" + id, this.updateStatus);
      if (res.status == 200) {
        swal.fire("ดำเนินการเรียบร้อย");
        this.$router.push("/home");
      } else {
        swal.fire("โปรดติดต่อเจ้าหน้าที่");
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style scoped>
.page {
  font-family: "TH Sarabun New";
  width: 21cm;
  min-height: 28cm;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: auto;
}
.subpage {
  padding: 1cm;
  height: 256mm;
}

@page {
  size: A4;
  margin: 0;
}

table {
  border-collapse: collapse;
}
td {
  position: relative;
  border-right: 2px solid black;
  border-left: 2px solid black;
}
</style>