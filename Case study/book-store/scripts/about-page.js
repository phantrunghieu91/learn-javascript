class AboutPage {
        render = () => {
        document.getElementById('main-container').innerHTML = '';
        const container = document.createElement('div');
        container.classList.add('container');
        const pageTitle = document.createElement('div');
        pageTitle.classList.add('page-title');
        pageTitle.innerHTML = '<h3>Giới thiệu</h3>';
        const pageContent = document.createElement('div');
        pageContent.classList.add('page-content');
        pageContent.innerHTML = `
        <h4>1. CÁC DÒNG SÁCH LƯU HÀNH</h4><br>
        <p>Với Slogan “Ươm mầm văn hóa đọc”, nhà sách việt không ngừng nỗ lực hoàn thiện mình, mang về và cung cấp ra thị trường cho độc giả những đầu sách ý nghĩa, quý báu chia sẻ những tri thức hay của nhân loại, để gặt lấy sự tin tưởng và ủng hộ của độc giả cả nước.</p>
        <p><strong>Nhà sách Hội An</strong> với hơn 10.000 + đầu sách là một trong những kho tàng tri thức, là một thế giới sách khổng lồ về tri thức mang đến cho độc giả nhiều sự lựa chọn hợp lý nhất được phục vụ một cách nhanh nhất.</p> 
        <p>Những danh mục sách như : Nuôi dạy con, Thiếu nhi, Kinh doanh, Ngoại ngữ, Tham khảo, Phong thủy… Được nhà sách cập nhật sách mới theo từng ngày , từng giờ với mong muốn đáp ứng mọi click chuột của quý độc giả khi tìm kiếm.</p>
        <p>Ngoài ra <strong>nhà sách Hội An</strong> còn có một bộ phận " Đặt sách theo yêu cầu " khi những sản phẩm mà quý độc giả không tìm thấy trên website thì quý độc giả có thể điền vào ô " đặt sách theo yêu cầu " để bộ phận chăm sóc khách hàng xử lý một cách nhanh nhất.</p><br>
        <h4>2. ĐỊA CHỈ LIÊN HỆ</h4>
        <p>Đ/C: Số 2 Nguyễn Huệ, Hội An, Quảng Nam</p> 
        <p>- Tầng trệt: Văn phòng phẩm</p>
        <p>- Tầng 1: Nhà sách</p>
        `;

        container.append(pageTitle, pageContent);
        document.getElementById('main-container').append(container);
    };
};